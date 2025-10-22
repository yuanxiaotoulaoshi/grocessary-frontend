import {useState, useRef,useCallback} from 'react';
export function useAudioPlayer(){
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement|null>(null);
    const play = useCallback((url:string)=>{
        if(audioRef.current){
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        const audio  = new Audio(url);
        audioRef.current = audio;
        audio.addEventListener('play',()=>setIsPlaying(true));
        audio.addEventListener('ended',()=>setIsPlaying(false));
        audio.addEventListener('pause',()=>setIsPlaying(false));
        audio.play().catch((error)=>{
            console.log("Audio play failed", error);
            setIsPlaying(false);
        })
    },[])

    const pause = useCallback(()=>{
        if(audioRef.current){
            audioRef.current.pause();
        }
    },[])

    const stop = useCallback(()=>{
        if(audioRef.current){
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(true);
        }
    },[])
    return {play,pause,stop,isPlaying};
}