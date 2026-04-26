import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full min-w-0">
      {label && (
        <label className="inline-block mb-2.5 text-sm font-medium text-slate-200 tracking-tight">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="82yts1imppclejdhy1knqxumbiemhodgmm312g16jh735llz"
            initialValue={defaultValue}
            init={{
              height: 400,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media | removeformat | help",
              content_style: `
                body { 
                  font-family: 'Inter', Helvetica, Arial, sans-serif; 
                  font-size: 15px; 
                  color: #e2e8f0; 
                  background: #0f172a;
                  line-height: 1.7;
                  padding: 8px;
                }
                a { color: #ae7aff; }
                h1, h2, h3 { color: #f1f5f9; }
              `,
              placeholder: "Start writing your story...",
            }}
            onEditorChange={onChange}
          />
        )}
      ></Controller>
    </div>
  );
}
