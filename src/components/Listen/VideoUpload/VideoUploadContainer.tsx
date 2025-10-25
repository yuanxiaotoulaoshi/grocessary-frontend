import VideoUploadUI from './VideoUploadUI';
import useVideoUpload from './useVideoUpload';

interface VideoUploadProps {
    onUploadSuccess:(file:File)=>void;
} 

export default function VideoUploadContainer({onUploadSuccess}:VideoUploadProps){
    const {
        fileInputRef,
        triggerFileInput,
    } = useVideoUpload();

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file||!file.type.includes("video")) return;
        onUploadSuccess(file);
    }

    return(
        <VideoUploadUI 
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            triggerFileInput={triggerFileInput}
        />
    )
}