import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userID: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const imageRegister = register("image", { required: !post });
  const currentCoverUrl = post
    ? appwriteService.getFeaturedImageUrl(post.featuredImage)
    : null;

  return (
    <div className="pb-12 sm:pb-16">
      <form
        onSubmit={handleSubmit(submit)}
        className="animate-fade-in w-full max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_min(100%,20rem)] xl:grid-cols-[minmax(0,1fr)_22rem] gap-8 lg:gap-10 items-start">
          {/* ===== Main column — show second on small screens (settings go first) ===== */}
          <div className="order-2 lg:order-1 space-y-7 sm:space-y-8 min-w-0">
            <Input
              label="Title"
              placeholder="Enter your post title..."
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="post-url-slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>

          {/* ===== Sidebar — first on mobile so publish is reachable without scrolling past the editor ===== */}
          <div className="order-1 lg:order-2 w-full min-w-0 lg:max-w-none self-start lg:sticky lg:top-[5.5rem]">
            <div className="glass-sidebar p-6 sm:p-7 space-y-6 sm:space-y-7 shadow-[0_4px_40px_-12px_rgba(0,0,0,0.35)]">
              {/* Header */}
              <div className="flex items-center gap-2.5 pb-1 border-b border-white/5 -mx-1 px-1">
                <div className="w-2 h-2 rounded-full bg-[#ae7aff] pulse-dot shrink-0" aria-hidden />
                <h3 className="text-base font-semibold text-slate-100 tracking-tight">
                  Post Settings
                </h3>
              </div>

              {/* Dropzone */}
              <div>
                <label className="inline-block mb-2.5 text-sm font-medium text-slate-200">
                  Featured Image
                </label>
                <div
                  className={`dropzone p-6 sm:p-7 sm:px-8 ${fileName ? "has-file" : ""} ${dragActive ? "border-[#ae7aff] bg-[#ae7aff]/5" : ""}`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={() => setDragActive(false)}
                >
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...imageRegister}
                    onChange={(e) => {
                      imageRegister.onChange(e);
                      setFileName(e.target.files?.[0]?.name || "");
                    }}
                  />
                  {fileName ? (
                    <div className="relative z-10">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[#ae7aff]/15 flex items-center justify-center">
                        <span className="text-[#ae7aff] text-lg">✓</span>
                      </div>
                      <p className="text-sm text-slate-300 font-medium truncate max-w-[200px] mx-auto">
                        {fileName}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-700/50 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-400 font-medium">
                        Drop image here or click
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Current image preview (edit mode) */}
              {post && currentCoverUrl && (
                <div className="rounded-[10px] overflow-hidden border border-slate-700/50">
                  <img
                    src={currentCoverUrl}
                    alt={post.title}
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                  <div className="px-3 py-2 bg-slate-800/50">
                    <p className="text-xs text-slate-500">Current image</p>
                  </div>
                </div>
              )}

              {/* Status */}
              <Select
                options={["active", "inactive"]}
                label="Status"
                {...register("status", { required: true })}
              />

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />

              {/* Submit — extra padding so the button is not flush with the card edge */}
              <div className="pt-1 pb-0.5">
                <Button type="submit" className="w-full min-h-12 text-[15px]">
                  {post ? "✨ Update Post" : "🚀 Publish Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
