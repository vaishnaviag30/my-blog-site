import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post, variant = "all" }) {
  if (!post) return null;
  const { $id, title, featuredImage } = post;
  const imageClass=
  variant === "home"
  ? "w-full h-full object-contain bg-gray-100 rounded-t-2xl"
  : "w-full h-full object-cover rounded-t-2xl"

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-xs bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50
                      rounded-2xl shadow-md hover:shadow-xl
                      transition-all duration-300 transform hover:-translate-y-2 overflow-hidden
                      flex flex-col">
        {/* Image */}
        <div className="w-full h-48 overflow-hidden rounded-t-2xl flex-shrink-0 flex items-center justify-center bg-gray-100">
          <img
            src={
              featuredImage
                ? appwriteService.getFileView(featuredImage)
                : "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={title}
            className={`${imageClass} hover:scale-105 transition-transform duration-300`}
          />
        </div>

        {/* Title */}
        <div className="p-4 flex-1 flex items-center justify-center">
          <h2 className="text-lg font-semibold text-purple-800 text-center truncate hover:text-pink-500 transition">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

