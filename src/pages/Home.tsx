import { Link } from 'react-router-dom';
import VideoSwiperContainer from 'components/Home/VideoSwiper/VideoSwiperContainer';
import {useTranslation} from 'react-i18next';

export default function Home() {
	const {t} = useTranslation('home');
    return (
        <div className="min-h-screen bg-white flex flex-col">
        {/* Hero区 */}
        <main className="flex-1 bg-gradient-to-br from-blue-50 to-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                👋 {t('home.welcome')} <span className="text-theme">{t('home.webName')}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                {t('home.webIntro')}
            </p>
            <div className="flex justify-center space-x-4">
                <Link
                to="/glossary"
                className="bg-theme text-white px-6 py-3 rounded-xl shadow hover:bg-theme transition"
                >
                {t('home.dictionaryBtn')}
                </Link>
                <Link
                to="/glossary/listening"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition"
                >
                {t('home.intensiveBtn')}
                </Link>
                <Link
                to="/Collect"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition"
                >
                {t('home.collectionBtn')}
                </Link>
            </div>
            </div>
        </main>

        {/* 功能介绍 */}
        <VideoSwiperContainer/>

        {/* 页脚 */}
        <footer className="border-t py-6 text-center text-sm text-gray-500">
            {t('home.at')} {new Date().getFullYear()} {t('home.belowIntro')}
        </footer>
        </div>
    );
}
