import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  console.log("Preview file ID:", post?.featuredImage);

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  //console.log("Redux userData:", userData);

  const slugTransform = useCallback((value) => {
    if (!value || typeof value !== "string") return "";
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      if (!userData?.$id) {
        console.error("No user found. Please log in.");
        return;
      }

      if (post) {
        // EDIT MODE
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && post.featuredImage) {
          try {
            await appwriteService.deleteFile(post.featuredImage);
          } catch (e) {
            console.warn("Delete old file failed (continuing):", e);
          }
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage, // ✅ Correct field name
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        // CREATE MODE
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file?.$id || undefined, // ✅ Correct field name
          userid: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit, (errors) =>
        console.log("Form errors ❌", errors)
      )}
      className="flex flex-wrap"
    >
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const fileURL = URL.createObjectURL(e.target.files[0]);
              setValue("previewImage", fileURL);
            } else {
              setValue("previewImage", null);
            }
          }}
        />

        {/* ✅ Fixed: Only one image block */}
        <div className="w-full mb-4">
          {watch("previewImage") ? (
            <img
              src={watch("previewImage")}
              alt="New Preview"
              className="rounded-lg"
            />
          ) : post?.featuredImage ? (
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          ) : null}
        </div>

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
