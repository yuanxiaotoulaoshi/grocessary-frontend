import {useEffect, useRef,useState} from 'react';
import {request} from '../../services/api';
import { useLocation } from 'react-router-dom';

export default function useIntensive(){
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
    const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    return {
        modeSettings,
        playMode,
        videoRef,
        videoUrl,
        listRef,
        subtitles,
        subtitleRefs,
        activeIndex,
        selectedText,
        currentMetadata,
        showForm,
        handleUploadSuccess,
        setPlayMode,
        handleCollectSentences,
        handleSubtitleClick,
        formatTime,
        setShowForm,
    }
}