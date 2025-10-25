import { Link } from 'react-router-dom';
import VideoSwiperContainer from 'components/Home/VideoSwiper/VideoSwiperContainer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero区 */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            👋 欢迎使用 <span className="text-theme">Lexily</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            开发者专属中英术语词典，快速理解技术概念。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/glossary"
              className="bg-theme text-white px-6 py-3 rounded-xl shadow hover:bg-theme transition"
            >
              查看术语词典
            </Link>
            <Link
              to="/glossary/listening"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition"
            >
              精听
            </Link>
            <Link
              to="/Collect"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition"
            >
              我的收藏
            </Link>
          </div>
        </div>
      </main>

      {/* 功能介绍 */}
      <VideoSwiperContainer/>

      {/* 页脚 */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Glossary. All rights reserved.
      </footer>
    </div>
  );
}
