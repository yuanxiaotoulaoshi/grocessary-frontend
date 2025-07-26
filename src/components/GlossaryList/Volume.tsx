import { Volume2 } from 'lucide-react';
import { throttle } from "lodash";
import { useMemo } from 'react';

interface VolumnProps {
  text: string;
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

const Volume: React.FC<VolumnProps> = ({text})=>{
  const speak = useThrottledSpeak()
  return (
    <button
      className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition"
    >
      <Volume2 onClick={() => speak(text)} className="w-3 h-3 text-white" />
    </button>
  ); 
}
export default Volume;