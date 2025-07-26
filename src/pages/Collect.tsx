import React,{ useState,useEffect } from "react"
import {request} from '../services/api';

interface FavoriteItem{
    _id: string;
    sentence: string;
    audioPath: string;
    start: number;
    end: number;
    videoId: string;
    baseName:string;
}
export default function Collect(){
    const [favorites,setFavorites] = useState<FavoriteItem[]>([]);
    const [currentAudio, setCurrentAudio] = useState<string|null>(null);
    const fetchCollect = () => {
        request({
            method: 'GET',
            url: '/listen/favorites',
        }).then((res) => {
            setFavorites(res);
        });
    };
    const cancelCollect = (listenId:string)=>{
        request({
            method: 'DELETE',
            url: '/listen/unfavorite',
            data:{
                listenId,
            }
        }).then((res) => {
            console.log('resss',res)
        });
    }
    const playAudio = (baseName:string,videoId:string)=>{
        const url = `http://localhost:3000/uploads/${baseName}_sentences/sentence_${videoId}.mp3`

        // const audio = new Audio(`/clips/${path}`);
        const audio = new Audio(url);
        audio.play();
        setCurrentAudio(videoId);
    }
    useEffect(()=>{
        fetchCollect();

    },[])
    return(
        <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">收藏的句子</h2>
      <ul className="space-y-4">
        {favorites.map((item) => (
          <li
            key={item._id}
            className="p-4 bg-white rounded-2xl shadow hover:bg-gray-100 flex justify-between items-center transition"
          >
            <div>
              <p className="text-gray-800">{item.sentence}</p>
              <p className="text-sm text-gray-500">
                时长: {(item.end - item.start).toFixed(2)} 秒 | 视频 ID: {item.videoId}
              </p>
            </div>
            <button
              onClick={() => playAudio(item.baseName,item.videoId)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              播放
            </button>
            <button
              onClick={() => cancelCollect(item._id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              取消收藏
            </button>
          </li>
        ))}
      </ul>
      {currentAudio && (
        <div className="mt-4 text-sm text-gray-600">
          当前播放：<code>{currentAudio}</code>
        </div>
      )}
    </div>
    )
}