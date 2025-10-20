import { useEffect,useState } from 'react';

export function useTheme(){
    const [dark, setDark] = useState(()=>
        localStorage.theme === 'dark' || 
    (!('theme' in localStorage)&& window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
    useEffect(()=>{
        if(dark){
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }else{
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    },[dark]);
    return {dark,setDark};
}