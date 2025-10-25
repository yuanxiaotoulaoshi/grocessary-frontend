import VideoSwiperUI from './VideoSwiperUI';
import useVideoSwiper from './useVideoSwiper';

export default function VideoSwiperContainer(){
    const {videos,navigateToPage} = useVideoSwiper()
    return (
        <VideoSwiperUI 
            videos={videos}
            navigateToPage={navigateToPage}
        />
    )
}