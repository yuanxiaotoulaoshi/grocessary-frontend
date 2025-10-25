
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
type VideoItem = {
    url: string;
    cover?: string;
};

interface VideoSwiperProps {
    videos:VideoItem[];
    navigateToPage:(url:string)=>void;
}

export default function VideoSwiper({
    videos,
    navigateToPage,
}:VideoSwiperProps){
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-xl font-bold mb-8 text-center">最近上传的视频</h2>
            
            <div className="bg-theme/10">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    grabCursor={true}
                    slidesPerView={5}  
                    spaceBetween={10}
                    loop={true}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    style={{
                        height: 'calc(100vh - 300px)',
                    }}
                    className="w-full h-[calc(100vh-100px)] overflow-visible video-swiper"
                >
                    {videos.map((item, idx) => (
                        <SwiperSlide 
                            onClick={()=>navigateToPage(item.url)}
                            key={idx}
                            className="transition-all duration-300 ease-in-out"
                        >
                            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100 shadow-lg group cursor-pointer transform transition-all duration-300">
                                {/* 视频缩略图 */}
                                <img 
                                    src={item.cover} 
                                    alt={`Video ${idx + 1}`}
                                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                                />
                                
                                {/* 播放按钮覆盖层 */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* 视频标题（可选） */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <p className="text-white text-sm font-medium">
                                        视频 {idx + 1}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            {/* 自定义样式覆盖 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .video-swiper .swiper-pagination-bullet {
                    background: #3498A6;
                    opacity: 0.7;
                }
                .video-swiper .swiper-pagination-bullet-active {
                    background: #3498A6;
                    opacity: 1;
                }
                .video-swiper .swiper-slide {
                    transition: all 0.3s ease !important;
                }
                `
            }} />
        </div>
    );
}