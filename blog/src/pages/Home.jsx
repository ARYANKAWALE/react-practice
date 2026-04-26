import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center relative z-10 px-4">
        <Container>
          <div className="max-w-lg mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-2xl bg-[#ae7aff]/10 border border-[#ae7aff]/15 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl">✍️</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 gradient-text leading-tight">
              Welcome to BlogApp
            </h1>
            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-md mx-auto">
              Discover stories, ideas, and insights. Login to start reading and creating.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 relative z-10 min-h-screen">
      <Container>
        <div className="mb-8 sm:mb-10 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1.5">Latest Posts</h1>
          <p className="text-slate-500 text-sm sm:text-base">Fresh stories from the community</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 animate-fade-in-delay">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
