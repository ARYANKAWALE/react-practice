import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [coverLoadFailed, setCoverLoadFailed] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((p) => {
        if (p) setPost(p);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  useEffect(() => {
    setCoverLoadFailed(false);
  }, [post?.$id, post?.featuredImage]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const coverUrl = post
    ? appwriteService.getFeaturedImageUrl(post.featuredImage)
    : null;
  const showCover = coverUrl && !coverLoadFailed;

  return post ? (
    <div className="py-6 sm:py-10 relative z-10 min-h-screen">
      <Container>
        <div className="animate-fade-in">
          <div className="w-full mb-6 sm:mb-10 relative rounded-[10px] sm:rounded-2xl overflow-hidden border border-white/5 shadow-2xl min-h-[12rem] sm:min-h-[18rem] bg-slate-800/80">
            {showCover ? (
              <img
                src={coverUrl}
                alt={post.title}
                className="w-full h-48 sm:h-72 md:h-96 object-cover"
                onError={() => setCoverLoadFailed(true)}
                decoding="async"
              />
            ) : (
              <div
                className="w-full h-48 sm:h-72 md:h-96 flex items-center justify-center bg-gradient-to-br from-slate-800 to-[#ae7aff]/5"
                aria-hidden
              >
                <span className="text-6xl sm:text-7xl opacity-30">📄</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent pointer-events-none" />
            {isAuthor && (
              <div className="absolute right-3 sm:right-5 top-3 sm:top-5 flex gap-2 sm:gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="px-3 sm:px-5 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold rounded-[10px] backdrop-blur-sm transition-all duration-200 hover:scale-105 cursor-pointer text-xs sm:text-sm shadow-lg">
                    ✏️ Edit
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="px-3 sm:px-5 py-2 bg-red-500/90 hover:bg-red-500 text-white font-semibold rounded-[10px] backdrop-blur-sm transition-all duration-200 hover:scale-105 cursor-pointer text-xs sm:text-sm shadow-lg"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
          <article className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="text-xs text-slate-500">
                📅{" "}
                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${post.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}
              >
                {post.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 sm:mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="h-px bg-gradient-to-r from-[#ae7aff]/50 via-[#ae7aff]/20 to-transparent mb-8"></div>
            <div className="text-slate-300 leading-relaxed text-base sm:text-lg [&>p]:mb-5 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>blockquote]:border-l-4 [&>blockquote]:border-[#ae7aff] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-400 [&>a]:text-[#ae7aff] [&>a]:underline [&>img]:rounded-[10px]">
              {parse(post.content)}
            </div>
          </article>
        </div>
      </Container>
    </div>
  ) : null;
}
