import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white ">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* 홈 링크 */}
        <Link href="/" className="text-blue-600 text-2xl text-2xl hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition-all font-semibold">
         Home
        </Link>

        {/* 로그인 여부에 따른 링크 및 버튼 */}
        <div className="space-x-6">
          {!user ? (
            <>
              <Link
                href="/signup"
                className="text-blue-600 text-2xl hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                회원가입
              </Link>
              <Link
                href="/login"
                className="text-blue-600 text-2xl hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                로그인
              </Link>
            </>
          ) : (
            <>
              <span className="text-blue-600">환영합니다, {user.email}!</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
