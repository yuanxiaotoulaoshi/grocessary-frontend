import React from 'react';

interface VideoUploadProps {
    fileInputRef: React.LegacyRef<HTMLInputElement> | undefined;
    handleFileChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    triggerFileInput:()=>void;
}
export default function VideoUpload({
    fileInputRef,
    handleFileChange,
    triggerFileInput
}:VideoUploadProps){
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

