import { Star } from 'lucide-react';
import VideoUploadContainer from 'components/Listen/VideoUpload/VideoUploadContainer';
import FormModalContainer from 'components/GlossaryList/FormModal/FormModalContainer';

type SubtitleSegment = {
    index: number;
    start: number;
    end: number;
    text: string;
};

type PlayMode = 'default' | 'pauseAfter' | 'loop';

interface IntensiveUIProps{
    modeSettings:{mode:string,name:string}[];
    playMode:string;
    videoRef:React.LegacyRef<HTMLVideoElement>;
    videoUrl:string;
    listRef:React.LegacyRef<HTMLDivElement>;
    subtitles:SubtitleSegment[];
    subtitleRefs:React.MutableRefObject<(HTMLDivElement|null)[]>;
    activeIndex:number|null;
    selectedText:string;
    currentMetadata:string;
    showForm:boolean;
    handleUploadSuccess:(file:File)=>void;
    setPlayMode:React.Dispatch<React.SetStateAction<PlayMode>>;
    handleCollectSentences:(sub:SubtitleSegment,index:number)=>void;
    handleSubtitleClick:(start:number,end:number)=>void
    formatTime:(seconds:number)=>string;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function  IntensiveListening({
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
}:IntensiveUIProps) {
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
                        onClick={() => setPlayMode(item.mode as PlayMode)}
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

            {showForm && (<FormModalContainer 
                defaultEnName={selectedText}
                currentMetadata={currentMetadata}
                showForm={showForm}
                theme='light'
                className=''
                setShowForm={setShowForm}
            />)}
        </div>
    )
}