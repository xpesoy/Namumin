import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const { error } = await supabase.from("posts").insert([
      { title, content, author_id: user.id }
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("글 작성 완료!");
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar 추가 */}
      <Navbar />

      {/* 게시글 작성 폼 */}
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">새 게시글 작성</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 입력 필드 */}
            <div>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            {/* 내용 입력 필드 */}
            <div>
              <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-4 h-64 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            {/* 작성하기 버튼 */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                작성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
