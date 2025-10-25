import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import {request,BASE_URL} from '../../../services/api';

export default function useVideoSwiper(){
    const navigate = useNavigate();
    type VideoItem = {
        url: string;
        cover?: string;
    };
    const [videos, setVideos] = useState<VideoItem[]>([]);

    const navigateToPage = (videoUrl:string)=>{
        navigate('/glossary/listening',{ state: { videoUrl } });
    }

    useEffect(() => {
        request({
            method: 'GET',
            url: '/listen/random-videos',
        }).then(res=>{
            const mockVideos = res.map((item:{fileName:string, cover:string})=>{
                return {
                    url:BASE_URL+item.fileName,
                    cover:BASE_URL+item.cover
                }
            });
            setVideos(mockVideos);
        })
    }, []);

    return {
        videos,
        navigateToPage,
    }
}