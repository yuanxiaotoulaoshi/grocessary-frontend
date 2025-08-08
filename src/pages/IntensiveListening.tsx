import {useEffect, useRef,useState} from 'react';
import { Star } from 'lucide-react';
import {request} from '../services/api';
import VideoUpload from 'components/Listen/VideoUpload';

export default function  IntensiveListening() {
    type PlayMode = 'default' | 'pauseAfter' | 'loop';
    type SubtitleSegment = {
        index: number;
        start: number;
        end: number;
        text: string;
      };
    const videoRef = useRef<HTMLVideoElement|null>(null);
    // const [playMode,setPlayMode] = useState<'default'|'pauseAfter'|'loop'>('pauseAfter');
    const [playMode, setPlayMode] = useState<PlayMode>('pauseAfter');
    const [currentSegment,setCurrentSegment] = useState<{start:number;end:number}|null>(null);
    const [videoUrl,setVideoUrl] = useState('');
    const [subtitles,setSubtitles] = useState<SubtitleSegment[]>([]);
    const [baseName,setBaseName] = useState('');

    const modeSettings: { mode: PlayMode; name: string }[] = [
        { mode: 'default', name: '顺序播放' },
        { mode: 'pauseAfter', name: '播一句暂停' },
        { mode: 'loop', name: '单句循环' },
    ];
    const handleSubtitleClick = (startTime:number,endTime:number)=>{
        if(videoRef.current){
            videoRef.current.currentTime = startTime;
            videoRef.current.play();
            setCurrentSegment({start:startTime,end:endTime});
        }
    };

    const handleCollectSentences = (sub:any,index:number)=>{
        const {text,start,end} = sub;
        console.log('subbb',sub);
        request({
            method: 'POST',
            url: '/listen/collect',
            data: {
                sentence:text,
                videoId:index,
                start:start,
                end:end,
                audioPath:'sentence_'+index+'.mp3',
                baseName,
            },
        }).then((res) => {
            console.log('collect result', res)
        });
    }

    const handleUploadSuccess = async (file:File)=>{
        const formData = new FormData();
        formData.append('file',file);
        setVideoUrl(URL.createObjectURL(file))
        console.log("videoUrllll",URL.createObjectURL(file))
        request({
            method:'POST',
            url:'/listen/upload',
            data:formData,
        }).then(res=>{
            const videoPath = res.savePath;
            // const videoPath = 'uploads/1753439670187.mp4'
            const baseName = videoPath.match(/uploads\/(.+?)\.mp4/)?.[1] ?? '';
            console.log("baseName2222",baseName)
            setBaseName(baseName);
            // 上传成功后轮询字幕处理结果
            const pollInterval = 20*1000; // 每5秒轮询
            const maxAttempts = 60; // 最多轮询 60 次
            let attempts = 0;

            const pollForTranscript = () => {
            attempts++;
            request({
                method: 'GET',
                url: '/listen/segents',
                params: { videoPath },
            })
                .then((segRes) => {
                const { status, segments } = segRes;
                if (status==='done') {
                    console.log('✅ 拿到字幕数据:', segRes);
                    // 设置字幕状态（你可能要改状态管理）
                    setSubtitles(segments);
                } else {
                    if (attempts < maxAttempts) {
                    setTimeout(pollForTranscript, pollInterval);
                    } else {
                    console.error('⏰ 字幕处理超时');
                    }
                }
                }).catch((err) => {
                    console.error('轮询出错:', err);
                    if (attempts < maxAttempts) {
                        setTimeout(pollForTranscript, pollInterval);
                    }
                });
            };

            pollForTranscript();
        })
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onTimeUpdate = () => {
          if (currentSegment && video.currentTime >= currentSegment.end) {
            if (playMode === 'pauseAfter') {
                video.pause();
            } else if (playMode === 'loop') {
                video.currentTime = currentSegment.start;
                video.play();
            }
          }
        };
        video.addEventListener('timeupdate', onTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', onTimeUpdate);
        };
      }, [currentSegment, playMode]);    

    const formatTime = (seconds:number)=>{
        const m = Math.floor(seconds/60);
        const s = Math.floor(seconds%60);
        return `${m}:${s.toString().padStart(2,'0')}`;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="p-10 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Upload Your MP4 Video</h1>
                <VideoUpload 
                    onUploadSuccess={handleUploadSuccess}
                />
            </div>
            <div>
                {modeSettings.map((item)=>(
                    <button 
                        onClick={() => setPlayMode(item.mode)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
                            ${  playMode === item.mode
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                            }`}
                        key={item.mode}
                    >{item.name}</button>))}
            </div>

            <div className="flex gap-6 flex-col lg:flex-row">
                <div className="flex-shrink-0">
                   <video 
                        ref={videoRef}
                        width="500"
                        controls
                        className="rounded-xl shadow-md border"
                        src={videoUrl}
                    /> 
                </div>
                
                <div className="flex-1 max-h-[500px] overflow-y-auto bg-white rounded-xl shadow-md border p-4">
                    <h3 className="text-lg font-semibold mb-4">Subtitles</h3>
                    <div className="space-y-3">
                        {subtitles.map((sub,index)=>(    
                            <div className='flex items-center gap-2 group' key={index}>
                                <Star 
                                    onClick={()=>handleCollectSentences(sub,index)}  
                                    className="w-5 h-5 mt-1 text-gray-400 hover:text-yellow-500 cursor-pointer"
                                />
                                <div 
                                    onClick={()=>handleSubtitleClick(sub.start,sub.end)}
                                    className="cursor-pointer p-2 rounded-lg hover:bg-blue-50 w-full transition"
                                >
                                    <div className="text-xs text-gray-500 mb-1">{formatTime(sub.start)} - {formatTime(sub.end)}</div>
                                    <div className="text-sm leading-snug">{sub.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}