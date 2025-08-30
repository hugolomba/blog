import React, { useState } from "react";
import RichTextEditor from "./../utils/RichTextEditor";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content }); // envie para sua API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <RichTextEditor value={content} onChange={setContent} />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Post
      </button>
    </form>
  );
};

export default PostForm;