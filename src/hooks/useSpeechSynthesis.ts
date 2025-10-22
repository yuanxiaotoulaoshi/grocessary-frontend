import {useMemo} from 'react';
import {throttle} from 'lodash';

export function useSpeechSynthesis(options?:{throttleMs?:number}){
    const speak = (text:string, lang:string='en-US')=>{
        if(!text.trim()) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    }

    const throttledSpeak = useMemo(
        ()=> throttle(speak,options?.throttleMs||2000,{
            leading:true,
            trailing:false,
        }),[options?.throttleMs]
    )

    const cancel = ()=>{
        speechSynthesis.cancel()
    }
    return {speak:throttledSpeak, cancel};
}