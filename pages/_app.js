import { AuthProvider } from "../context/AuthContext";
import '../styles/globals.css';  // 여기에서 globals.css 임포트

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
