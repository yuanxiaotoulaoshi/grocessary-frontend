import { useState, useEffect, useCallback } from 'react';
import {request,BASE_URL} from '../../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import {RootState,AppDispatch} from 'store';
import {setGlossaryList} from '../../../store/glossarySlice';
import { usePagination } from 'hooks/usePagination';
import { useAudioPlayer } from 'hooks/useAudioPlayer';
import { useSpeechSynthesis } from 'hooks/useSpeechSynthesis';
import { GlossaryItem } from 'types/glossary';

const PAGE_SIZE = 10;

export default function useList(){
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const glossaryList = useSelector((state:RootState)=>state.glossary.glossaryList);
    const categoryInfo = useSelector((state: RootState) => state.selectedTab.categoryInfo)
    const {activeLevel1,activeLevel2ByLevel1} = useSelector((state: RootState) => state.selectedTab.curSelectedInfo)
    
    const level1Tabs = Object.keys(categoryInfo);
    const currentLevel1Label = level1Tabs[activeLevel1];
    const level2Tabs = categoryInfo[currentLevel1Label as keyof typeof categoryInfo]  || [];
    const currentLevel2Label = level2Tabs[activeLevel2ByLevel1[activeLevel1]?.[1]];

    const { pageIndex, isLastPage, nextPage, reset, checkIfLastPage } = usePagination({
        pageSize: PAGE_SIZE,
    });
    const { play: playAudio } = useAudioPlayer();
    const { speak } = useSpeechSynthesis({ throttleMs: 2000 });

    useEffect(()=>{
        if(!categoryInfo||!level1Tabs.length) return;
        reset()
        fetchGlossary(true);
    },[categoryInfo,activeLevel1,activeLevel2ByLevel1])

    // loadMore
    useEffect(() => {
        // avoid triggering again when exchange category
        if (pageIndex === 1) return;
        fetchGlossary(false);
        }, [pageIndex]);

    const handlePlay = useCallback((item: GlossaryItem) => {
        if (item.currentMetadata) {
            const [baseName, videoId] = item.currentMetadata.split(',');
            const url = `${BASE_URL}/uploads/${baseName}_sentences/sentence_${videoId}.mp3`;
            playAudio(url);
        } else {
            speak(item.enName);
        }
    },[]);

    const fetchGlossary = useCallback(
        (reset = false) => {
        if (!currentLevel1Label) return;
        setIsLoading(true);
        request({
          method: 'GET',
          url: '/glossary',
          params: {
            categoryLevel1: currentLevel1Label,
            categoryLevel2: level2Tabs[activeLevel2ByLevel1[activeLevel1][1]],
            page: reset ? 1 : pageIndex,
            pageSize: PAGE_SIZE,
          },
        }).then((res) => {
            dispatch(setGlossaryList(reset ? res : [...glossaryList, ...res]));
            checkIfLastPage(res.length);
            setIsLoading(false);
        });
    },[
        currentLevel1Label, 
        currentLevel2Label,
        level2Tabs, 
        pageIndex, 
        dispatch,
        checkIfLastPage
    ]);

    return{
        glossaryList,
        currentLevel1Label,
        isLoading,
        isLastPage,
        loadMore:nextPage,
        handlePlay,
    }
}

