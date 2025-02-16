import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("로그인 성공!");
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar 추가 */}
      <Navbar />
      
      {/* 로그인 폼 */}
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">NVL PROJECT</h1>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">로그인</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* 이메일 입력 필드 */}
            <div>
              <input
                type="email"
                placeholder="이메일"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 비밀번호 입력 필드 */}
            <div>
              <input
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 로그인 버튼 */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
