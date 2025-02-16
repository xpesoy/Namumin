import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CommentForm({ postId, user, onCommentAdded }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      { post_id: postId, content, author_id: user.id }
    ]);

    if (error) {
      alert("댓글 작성 실패: " + error.message);
    } else {
      setContent("");
      onCommentAdded(); // 댓글 목록 새로고침
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="댓글을 작성하세요"
        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg mb-4"
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        댓글 작성
      </button>
    </form>
  );
}
