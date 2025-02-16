module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',   // pages 폴더 내 모든 파일
    './components/**/*.{js,ts,jsx,tsx}', // components 폴더 내 모든 파일
    './app/**/*.{js,ts,jsx,tsx}',       // app 폴더가 있을 경우 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
