import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = appwriteService.getFeaturedImageUrl(featuredImage);

  useEffect(() => {
    setImgFailed(false);
  }, [featuredImage]);

  const showImg = imageUrl && !imgFailed;
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="glass-card overflow-hidden">
        {/* Image */}
        <div className="w-full h-44 sm:h-52 overflow-hidden relative bg-slate-800/80">
          {showImg ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-800/90 to-[#ae7aff]/10"
              aria-hidden
            >
              <span className="text-4xl opacity-40 grayscale">📝</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Read indicator */}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-[10px] bg-black/50 backdrop-blur-sm text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Read →
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-[#ae7aff] transition-colors duration-300 line-clamp-2 leading-relaxed">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
