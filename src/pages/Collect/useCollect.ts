import { useState,useEffect,useRef } from "react"
import {request,BASE_URL} from '../../services/api';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { usePagination } from 'hooks/usePagination';
import { FavoriteItem } from 'types/favoriteItem';

export default function useCollect(){
    const [favorites,setFavorites] = useState<FavoriteItem[]>([]);
    const [currentAudio, setCurrentAudio] = useState<string>('');

    // confirm to delete
    const [showCancel, setShowCancel] = useState(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [audioInstance, setAudioInstance] = useState<HTMLAudioElement|null>(null);

    const PAGE_SIZE = 10;

    const { pageIndex, isLastPage, nextPage, reset, checkIfLastPage } = usePagination({
            pageSize: PAGE_SIZE,
        });

    const [isLoading, setIsLoading] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // select text
    const [selectedText, setSelectedText] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [currentMetadata,setCurrentMetadata] = useState("");

    useInfiniteScroll(loadMoreRef, {
        isLoading,
        isLastPage,
        onLoadMore: nextPage,
    });

    useEffect(()=>{
        reset()
        fetchCollect(true);
    },[])

    useEffect(()=>{
        if (pageIndex === 1) return;
        fetchCollect(false);
    },[pageIndex])

    useEffect(()=>{
        const handleSelectionChange = () => {
            const text = window.getSelection()?.toString().trim();
            if (
                text && 
                text.length > 0 && 
                !showForm 
            ) {
                setTimeout(() => {
                    setSelectedText(text);
                    setShowForm(true);
                }, 300);
            }
        };
        const container = listRef.current;
        if(container){
            container.addEventListener("mouseup",handleSelection);
            container.addEventListener("selectionchange",handleSelectionChange);
        }
        return ()=>{
            if (container) {
                container.removeEventListener("mouseup", handleSelection);
                container.removeEventListener("selectionchange", handleSelectionChange);
            }
        }
    })

    const handleSelection = (e: MouseEvent | TouchEvent)=>{
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        const target = e.target as HTMLElement;
        const li = target.closest("li.text-sentence") as HTMLElement;
        // 只处理在 li.text-sentence 里的事件
        if (!li) return;
        if (li.closest(".form-dialog")) return;
        if(text && text.length > 0 ){
            const baseName = li.dataset.baseName;
            const videoId = li.dataset.videoId;
            setTimeout(() => {
                setSelectedText(text);
                setCurrentMetadata(baseName + ',' + videoId );
                setShowForm(true);
            },300)
        }
    }

    // request collection list
    const fetchCollect = (reset = false) => {
        setIsLoading(true);
        request({
            method: 'GET',
            params:{
                pageIndex: reset ? 1 : pageIndex,
                pageSize: PAGE_SIZE,
            },
            url: '/listen/favorites',
        }).then((res) => {
            setFavorites(reset ? res : [...favorites, ...res]);
            // setIsLastPage(res.length < PAGE_SIZE);
            checkIfLastPage(res.length);
            setIsLoading(false);
        });
    };
    const handleDelete = (e:React.MouseEvent<HTMLButtonElement>,listenId:string)=>{
        e.stopPropagation()
        setShowCancel(true);
        setSelectedId(listenId);
    }

    // cancel collect
    const cancelCollect = (listenId:string)=>{
        request({
            method: 'DELETE',
            url: '/listen/unfavorite',
            data:{
                listenId,
            }
        }).then((res) => {
            console.log('resss',res)
            setShowCancel(false);
        }).catch(err=>{
            console.log("err",err)
        });
    }

    // play mp3
    const playAudio = (baseName:string,videoId:string)=>{
        const selectedText = window.getSelection()?.toString();
        if(selectedText&&selectedText.length>0) return;
        setCurrentAudio(videoId);
        const url = `${BASE_URL}/uploads/${baseName}_sentences/sentence_${videoId}.mp3`
        if(audioInstance){
            audioInstance.pause();
            audioInstance.currentTime = 0;
        }
        const newAudio = new Audio(url);
        newAudio.play();
        setAudioInstance(newAudio)
    }

    const formatDate = (time: string) => {
        if (!time) return '--';
        const now = Date.now(); 
        const diffDays = (now - new Date(time).getTime()) / (1000 * 60 * 60 * 24);
        return ''+Math.ceil(diffDays); 
    }
    return {
        listRef,
        favorites,
        currentAudio,
        isLoading,
        isLastPage,
        showCancel,
        loadMoreRef,
        selectedId,
        currentMetadata,
        selectedText,
        showForm,
        playAudio,
        formatDate,
        handleDelete,
        setShowCancel,
        cancelCollect,
        setShowForm,
    }
}