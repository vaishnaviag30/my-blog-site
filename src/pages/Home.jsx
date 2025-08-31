import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((res) => {
            if (res?.documents) {
                setPosts(res.documents)
            }
        })
    }, [])

    // Take 4 most recent posts based on creation date
    const recentPosts = posts
        .slice() // copy array
        .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
        .slice(0, 4);

    return (
        <div className="w-full py-12 min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 rounded-2xl relative overflow-hidden">
            
            {/* Cute floating stars */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="w-2 h-2 bg-pink-300 rounded-full absolute animate-bounce-slow" style={{top: '10%', left: '20%'}} />
                <div className="w-2 h-2 bg-purple-300 rounded-full absolute animate-bounce-slower" style={{top: '30%', left: '70%'}} />
                <div className="w-2 h-2 bg-blue-300 rounded-full absolute animate-bounce-slow" style={{top: '60%', left: '40%'}} />
                <div className="w-2 h-2 bg-pink-200 rounded-full absolute animate-bounce-slower" style={{top: '80%', left: '80%'}} />
            </div>

            <Container>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8
                               text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500">
                    Welcome to Postify ✨
                </h1>

                {/* Explore / Add Post Buttons */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => window.location.href="/all-posts"}
                        className="px-6 py-3 bg-pink-300 rounded-full font-semibold text-white hover:bg-pink-400 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                        Explore Posts
                    </button>
                    <button
                        onClick={() => window.location.href="/add-post"}
                        className="px-6 py-3 bg-purple-300 rounded-full font-semibold text-white hover:bg-purple-400 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                        Add New Post
                    </button>
                </div>

                {/* Recent Posts */}
                {recentPosts.length > 0 && (
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold 
                                       text-transparent bg-clip-text 
                                       bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 
                                       inline-block relative">
                            ✨ Recent Posts ✨
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-pink-200 rounded-full opacity-60"></span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 justify-items-strech">
                            {recentPosts.map((post) => (
                                <PostCard key={post.$id} post={post} variant="home" />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
