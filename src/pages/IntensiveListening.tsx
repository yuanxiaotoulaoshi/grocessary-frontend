import {useEffect, useRef,useState} from 'react';
import { Star } from 'lucide-react';
import {request} from '../services/api';
import { useLocation } from 'react-router-dom';
import VideoUploadContainer from 'components/Listen/VideoUpload/VideoUploadContainer';
import FormModel from '../components/GlossaryList/FormModel';

export default function  IntensiveListening() {
    type PlayMode = 'default' | 'pauseAfter' | 'loop';
    type SubtitleSegment = {
        index: number;
        start: number;
        end: number;
        text: string;
      };
    const location = useLocation();

    const videoRef = useRef<HTMLVideoElement|null>(null);
    const [playMode, setPlayMode] = useState<PlayMode>('pauseAfter');
    const [currentSegment,setCurrentSegment] = useState<{start:number;end:number}|null>(null);
    const [videoUrl,setVideoUrl] = useState('');
    const [subtitles,setSubtitles] = useState<SubtitleSegment[]>([]);
    const [baseName,setBaseName] = useState('');

    const listRef = useRef<HTMLDivElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedText, setSelectedText] = useState("");
    const [currentMetadata,setCurrentMetadata] = useState("");

    const [activeIndex, setActiveIndex] = useState<number|null>(null)
    const subtitleRefs = useRef<(HTMLDivElement|null)[]>([])
    const [isUserInteracting, setIsUserInteracting] = useState(false)

    const modeSettings: { mode: PlayMode; name: string }[] = [
        { mode: 'default', name: '顺序播放' },
        { mode: 'pauseAfter', name: '播一句暂停' },
        { mode: 'loop', name: '单句循环' },
    ];
    const handleSubtitleClick = (startTime:number,endTime:number)=>{
        if(videoRef.current){
            videoRef.current.currentTime = startTime;
            // videoRef.current.play();
            setTimeout(() => {
                videoRef.current?.play().catch(()=>{});
            }, 0);
            if(playMode !=='default'){
                setCurrentSegment({start:startTime,end:endTime});
            }else{
                setCurrentSegment(null);
            }
        }
    };

    const handleCollectSentences = (sub:any,index:number)=>{
        const {text,start,end} = sub;
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
        request({
            method:'POST',
            url:'/listen/upload',
            data:formData,
        }).then(res=>{
            const videoPath = res.savePath;
            const baseName = videoPath.match(/uploads\/(.+?)\.mp4/)?.[1] ?? '';
            setBaseName(baseName);
            console.log("BBBB",videoPath)
            console.log("CCCC",baseName)
            pollForTranscript(videoPath);
        })
    }

    const pollForTranscript = (videoPath:string) => {
        // 上传成功后轮询字幕处理结果
        const pollInterval = 20*1000; // 每5秒轮询
        const maxAttempts = 60; // 最多轮询 60 次
        let attempts = 0;
        attempts++;
        request({
            method: 'GET',
            url: '/listen/segents',
            params: { videoPath },
        }).then((segRes) => {
            const { status, segments } = segRes;
            if (status==='done') {
                console.log('✅ 拿到字幕数据:', segRes);
                // 设置字幕状态（你可能要改状态管理）
                setSubtitles(segments);
            } else {
                if (attempts < maxAttempts) {
                    setTimeout(()=>pollForTranscript(videoPath), pollInterval);
                } else {
                    console.error('⏰ 字幕处理超时');
                }
            }
        }).catch((err) => {
            console.error('轮询出错:', err);
            if (attempts < maxAttempts) {
                // setTimeout(pollForTranscript, pollInterval);
            }
        });
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onTimeUpdate = () => {

            if (currentSegment) {
                if (playMode === 'pauseAfter' && video.currentTime >= currentSegment.end) {
                    video.pause();
                    setTimeout(() => video.pause(), 0);
                } else if (playMode === 'loop' && video.currentTime >= currentSegment.end) {
                    video.currentTime = currentSegment.start;
                    setTimeout(() => video.play().catch(()=>{}), 0);
                }
            }
        };
        video.addEventListener('timeupdate', onTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, [currentSegment, playMode]);  
    
    useEffect(() => {
        const urlFromState = location.state?.videoUrl;
        if (urlFromState) {
            setVideoUrl(urlFromState);
            const videoPath = urlFromState.match(/uploads\/[^/]+\.mp4$/)?.[0] ?? '';
            const baseName = videoPath.match(/uploads\/(.+?)\.mp4/)?.[1] ?? '';
            if(videoPath){
                setBaseName(baseName);
                pollForTranscript(videoPath)
            }
        }
    }, [location.state]);

    useEffect(()=>{
        const handleSelectionChange = () => {
            const text = window.getSelection()?.toString().trim();
            if (
                text && 
                text.length > 0 && 
                !showForm 
            ) {
                setTimeout(() => {
                    setSelectedText(text);
                    setShowForm(true);
                }, 300);
            }
        };
        const container = listRef.current;
        if(container){
            container.addEventListener("mouseup",handleSelection);
            container.addEventListener("selectionchange",handleSelectionChange);
        }
        return ()=>{
            if (container) {
                container.removeEventListener("mouseup", handleSelection);
                container.removeEventListener("selectionchange", handleSelectionChange);
            }
        }
    })

    const handleSelection = (e: MouseEvent | TouchEvent)=>{
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        const target = e.target as HTMLElement;
        const div = target.closest("div.text-sentence") as HTMLElement;
        // 只处理在 div.text-sentence 里的事件
        if (!div) return;
        if (div.closest(".form-dialog")) return;
        if(text && text.length > 0 ){
            const videoId = div.dataset.videoId;
            setTimeout(() => {
                setSelectedText(text);
                console.log("baseNameee",baseName)
                setCurrentMetadata(baseName + ',' + videoId );
                setShowForm(true);
            },300)
        }
    }

    const formatTime = (seconds:number)=>{
        const m = Math.floor(seconds/60);
        const s = Math.floor(seconds%60);
        return `${m}:${s.toString().padStart(2,'0')}`;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <div className="p-10 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Upload Your MP4 Video</h1>
                <VideoUploadContainer 
                    onUploadSuccess={handleUploadSuccess}
                />
            </div>

            <div className="mb-2">
                {modeSettings.map((item)=>(
                    <button 
                        onClick={() => setPlayMode(item.mode)}
                        className={`px-4 py-2 mr-2 rounded-lg border text-sm font-medium transition 
                            ${  playMode === item.mode
                                    ? 'bg-theme text-white border-theme'
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
                    <div ref={listRef} className="space-y-3">
                        {subtitles.map((sub,index)=>(    
                            <div 
                                className="text-sentence flex items-center gap-2 group rounded-lg p-1"
                                key={index}
                                data-video-id={index}
                            >
                                <Star 
                                    onClick={()=>handleCollectSentences(sub,index)}  
                                    className="w-5 h-5 mt-1 text-gray-400 hover:text-yellow-500 cursor-pointer"
                                />
                                <div 
                                    ref={(el)=>(subtitleRefs.current[index] = el)}
                                    onClick={()=>handleSubtitleClick(sub.start,sub.end)}
                                    className={`cursor-pointer p-2 rounded-lg hover:bg-blue-50 w-full transition ${index===activeIndex&&playMode==='default'?'bg-theme/10':''}`}
                                >
                                    <div className="text-xs text-gray-500 mb-1">{formatTime(sub.start)} - {formatTime(sub.end)}</div>
                                    <div className="text-sm leading-snug">{sub.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FormModel 
                defaultEnName={selectedText}
                currentMetadata={currentMetadata}
                showForm={showForm} 
                setShowForm={()=>setShowForm(false)}
            />
        </div>
    )
}