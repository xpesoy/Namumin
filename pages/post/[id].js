import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";

export default function Post({ post }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await supabase.from("posts").delete().eq("id", post.id);
      router.push("/");
    }
  };

  return (

      <div className="bg-white rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">{post.title}</h1>
        <p className="text-lg text-gray-700 mb-6">{post.content}</p>

        {/* 글쓴이와 삭제/수정 버튼 */}
        {user && user.id === post.author_id && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => router.push(`/edit-post/${post.id}`)}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition-colors"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none transition-colors"
            >
              삭제
            </button>
          </div>
        )}

        {/* 댓글 목록 */}
        <div className="mb-6">
          <CommentList postId={post.id} />
        </div>

        {/* 댓글 작성 폼 */}
        {user && (
          <div className="mt-6">
            <CommentForm
              postId={post.id}
              user={user}
              onCommentAdded={() => window.location.reload()}
            />
          </div>
        )}
      </div>

  );
}

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase.from("posts").select("*").eq("id", params.id).single();
  if (error) console.error(error);

  return { props: { post } };
}
