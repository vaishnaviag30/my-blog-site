import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res?.documents) setPosts(res.documents);
    });
  }, []);

  const recentPosts = posts
    .slice()
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
    .slice(0, 4);

  return (
    <div className="min-h-screen w-full bg-purple-100">

      

      <Container>

        {/* ===== HERO SECTION ===== */}
        <section className="pt-32 pb-10 text-center space-y-6">
          <h1 className="text-5xl font-extrabold">
            Welcome to <span className="text-pink-500">Postify</span>
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Share your thoughts, stories, and creativity in one place.
          </p>

          <div className="flex gap-5 justify-center">
            <button className="px-6 py-3 bg-pink-200 rounded-lg">Explore Posts</button>
            <button className="px-6 py-3 bg-blue-200 rounded-lg">Add New Post</button>
          </div>

          {!userData?.$id && (
            <div className="flex justify-center mt-5">
              <button className="px-10 py-3 bg-[#FFD7C4] rounded-xl shadow-md">
                Login to read posts →
              </button>
            </div>
          )}
        </section>

        {/* ===== RECENT POSTS ===== */}
        {recentPosts.length > 0 && (
          <section className="my-16">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Posts</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.$id} post={post} variant="home" />
              ))}
            </div>
          </section>
        )}

      </Container>

      {/* ===== EXPLORE TOPICS — FULL WIDTH ===== */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-14">Explore Topics</h2>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">

          {[
            { name: "Travel", img: "/images/travel.jpg" },
            { name: "Food", img: "/images/food.jpg" },
            { name: "Tech", img: "/images/tech.jpg" },
            { name: "Study", img: "/images/study.jpg" },
            { name: "Music", img: "/images/music.jpg" },
            { name: "Lifestyle", img: "/images/lifestyle.jpg" },
          ].map((topic, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <img
                src={topic.img}
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg hover:scale-105 transition"
                alt={topic.name}
              />
              <p className="mt-3 text-gray-900 text-lg font-semibold">{topic.name}</p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}

export default Home;
