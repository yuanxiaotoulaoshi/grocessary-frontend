import {useRef} from 'react';

export default function useVideoUpload(){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const triggerFileInput = ()=>{
        fileInputRef.current?.click();
    }
    return {
        fileInputRef,
        triggerFileInput,
    }
}