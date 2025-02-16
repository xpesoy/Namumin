import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, content, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("댓글 불러오기 오류:", error.message);
    } else {
      setComments(data);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">댓글</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="p-4 bg-gray-50 rounded-lg shadow-sm transition-all duration-200">
            <p className="text-gray-800 text-lg mb-2">{comment.content}</p>
            <small className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
