import { Volume2 } from 'lucide-react';
import { throttle } from "lodash";
import { useMemo } from 'react';
import {BASE_URL} from '../../services/api';

type glossaryItem = {
    id:string,
    cnName:string,
    enName:string,
    categoryLevel1:string,
    categoryLevel2:string,
    currentMetadata:string,
}   

interface VolumnProps {
    glossaryItem: glossaryItem;
}

const playAudio = (currentMetadata:string)=>{
    const baseName = currentMetadata.split(',')[0];
    const videoId = currentMetadata.split(',')[1];
    const selectedText = window.getSelection()?.toString();
    if(selectedText&&selectedText.length>0) return;
    const url = `${BASE_URL}/uploads/${baseName}_sentences/sentence_${videoId}.mp3`
    const newAudio = new Audio(url);
    newAudio.play();
}

const useThrottledSpeak = () => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const throttledSpeak = useMemo(
    () => throttle(speak, 2000, { leading: true, trailing: false }),
    []
  );

  return throttledSpeak;
};

const Volume: React.FC<VolumnProps> = ({glossaryItem})=>{
  const speak = glossaryItem.currentMetadata?playAudio:useThrottledSpeak();
  const audioSource = glossaryItem.currentMetadata?glossaryItem.currentMetadata:glossaryItem.enName
  return (
    <button
      className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition"
    >
        <Volume2 onClick={() => speak(audioSource)} className="w-3 h-3 text-white" />
    </button>
  ); 
}
export default Volume;