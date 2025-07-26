import {request} from '../services/api';

export const translateToEnglish = async (text: string): Promise<string> => {
    const res = await request({
        url:"https://libretranslate.de/translate", 
        method:'GET',
        params:{
        q: text,
        source: "zh",
        target: "en",
        format: "text",
    }});

    return res.data.translatedText;
};