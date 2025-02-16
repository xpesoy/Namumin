import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Link from "next/link";

// 서버에서 데이터 가져오기
export async function getServerSideProps() {
  const { data: posts} = await supabase
    .from("posts")
    .select("id, title, created_at, author_id")
    .order("created_at", { ascending: false });

  // 각 게시글에 대한 작성자의 이름을 추가
  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => {
      const { data: author } = await supabase
        .from("users")
        .select("username")
        .eq("id", post.author_id)
        .single();

      return {
        ...post,
        author_name: author ? author.username : "알 수 없음",
        formatted_time: new Date(post.created_at).toLocaleString(),
      };
    })
  );

  return { props: { posts: postsWithAuthors || [] } };
}

export default function Home({ posts }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 사이트 이름 */}
      <meta http-equiv="Title" content="민재Inside" />
      <header className="bg-white shadow-md py-4">

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">민재Inside</h1>
          <Navbar />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto p-6 flex-1">
        <Link href="/new-post">
          <button className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 mb-6 transition-all">
            새 글 작성
          </button>
        </Link>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-gray-600">글쓴이: <span className="font-semibold">{post.author_name}</span></p>
              <p className="text-gray-500 text-sm">{post.formatted_time}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
