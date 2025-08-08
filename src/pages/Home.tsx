import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero区 */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            👋 欢迎使用 <span className="text-blue-600">Lexily</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            开发者专属中英术语词典，快速理解技术概念。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/glossary"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
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
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold mb-2">📚 海量术语</h3>
          <p className="text-gray-600">收录前端、后端、DevOps 等多个领域的核心术语。</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold mb-2">⚡ 快速搜索</h3>
          <p className="text-gray-600">关键词输入即刻呈现解释，支持中英文模糊搜索。</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold mb-2">🌐 多语言扩展</h3>
          <p className="text-gray-600">未来将支持多语言术语对照，助力全球开发者交流。</p>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Glossary. All rights reserved.
      </footer>
    </div>
  );
}
