
import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response?.documents) setPosts(response.documents);
      setLoading(false); // stop loading once fetched
    });
  }, []);

  return (
    <div className="w-full py-12 min-h-screen 
                    bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 
                    rounded-2xl shadow-md hover:shadow-xl 
                    transition-shadow duration-300 transform hover:-translate-y-1">
      <Container>
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 
                       text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500">
          Explore All Posts ✨
        </h1>

        {/* Posts Grid */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse mt-10">
            🚀 Loading posts...
          </p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                post={post}
                variant="all"
                className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl rounded-xl"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg animate-pulse mt-10">
            🚀 No posts available — Be the first to create one!
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
