import React, {useState,useRef} from 'react';

interface VideoUploadProps {
    onUploadSuccess:(file:File)=>void;
}
const VideoUpload:React.FC<VideoUploadProps> =({onUploadSuccess})=>{
    const [videoFile, setViedoFile] = useState<File|null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file||!file.type.includes("video")) return;
        setViedoFile(file);
        onUploadSuccess(file);
    }
    const triggerFileInput = ()=>{
        fileInputRef.current?.click();
    }
    return(
        <div className='flex flex-col items-center gap-4 p-6 border rounded-2xl shadow-xl'>

            <input
                type="file"
                accept="video/mp4"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button 
                onClick={triggerFileInput}
                type="button" 
                className="px-4 py-2 bg-theme text-white rounded hover:bg-theme"
            >
                Upload MP4 Video
            </button>
        </div>
    )
}
export default VideoUpload;
