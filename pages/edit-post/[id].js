import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function EditPost({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", post.id);

    if (error) {
      alert("수정 중 오류가 발생했습니다.");
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">게시글 수정</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* 제목 입력 필드 */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="글 제목을 입력하세요"
            />
          </div>

          {/* 내용 입력 필드 */}
          <div>
            <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="글 내용을 입력하세요"
            />
          </div>

          {/* 수정 완료 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase.from("posts").select("*").eq("id", params.id).single();
  if (error) console.error(error);

  return { props: { post } };
}
