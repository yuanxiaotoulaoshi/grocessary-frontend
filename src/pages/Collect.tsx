import { useState,useEffect,useRef } from "react"
import {request,BASE_URL} from '../services/api';
import ConfirmDialog from "components/dialogue/CancelDialog";
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import FormModel from '../components/GlossaryList/FormModel';

interface FavoriteItem{
    _id: string;
    sentence: string;
    audioPath: string;
    start: number;
    end: number;
    videoId: string;
    baseName:string;
}
export default function Collect(){
    const [favorites,setFavorites] = useState<FavoriteItem[]>([]);
    const [currentAudio, setCurrentAudio] = useState<string|null>(null);
    // confirm to delete
	const [showCancel, setShowCancel] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [audioInstance, setAudioInstance] = useState<HTMLAudioElement|null>(null);

    // loadmore
    const [pageIndex, setPageIndex] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const PAGE_SIZE = 10;
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // select text
    const [selectedText, setSelectedText] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [currentMetadata,setCurrentMetadata] = useState("");

    useInfiniteScroll(loadMoreRef, {
        isLoading,
        isLastPage,
        onLoadMore: () => {
            setPageIndex((prev) => prev + 1)
        }
    });

    useEffect(()=>{
        setPageIndex(1);
        setIsLastPage(false);
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
            console.log("***",li.dataset);

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
            setIsLastPage(res.length < PAGE_SIZE);
            setIsLoading(false);
        });
    };
	const handleDelete = (listenId:string)=>{
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

    return(
        <div ref={listRef} className="max-w-2xl mx-auto mt-8 p-6 bg-gray-50 rounded-3xl shadow-md">
		    <h2 className="text-2xl font-bold mb-4">我的收藏</h2>
            {favorites.length===0?
                (
                <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                    </svg>
                    <p className="text-lg">您还没有收藏任何内容哦~</p>
                    <p className="mt-2 text-sm">快去看看，收藏一些喜欢的句子吧！</p>
                </div>
                ):(<ul className="space-y-4">
                    {favorites.map((item) => (
                        <li
                            onClick={() => playAudio(item.baseName,item.videoId)}
                            key={item._id}
                            data-base-name={item.baseName}
                            data-video-id={item.videoId}
                            className={`text-sentence p-4 rounded-2xl shadow flex justify-between items-center gap-4 transition cursor-pointer ${currentAudio === item.videoId ? 'bg-blue-100' : 'bg-white'} hover:bg-gray-100`}
                        >
                            <div className="flex-1">
                            <p className="text-gray-800">{item.sentence}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                时长: {(item.end - item.start).toFixed(2)} 秒 | 视频 ID: {item.videoId}
                            </p>
                            </div>
                            <div className="flex gap-2">
        
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(item._id)
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                >
                                    取消收藏
                                </button>
                            </div>
                            
                        </li>
                    ))}
                </ul>)
            }

            {/* loadmore */}
            <div className="flex flex-col items-center mt-6 space-y-2">
                {!isLoading && !isLastPage && <div className="text-blue-600 cursor-pointer hover:underline text-sm" ref={loadMoreRef}></div>}
                {isLoading && <p className="text-gray-500 text-sm animate-pulse">加载中...</p>}
                {favorites.length === 0 && !isLoading && (
                    <p className="text-center text-gray-500">暂无数据</p>
                )}
                {isLastPage && favorites.length>0 && <p className="text-gray-400 text-sm">没有更多了</p>}
            </div>

            <ConfirmDialog
                isOpen={showCancel}
                onClose={() => setShowCancel(false)}
                onConfirm={() => {
                    if (selectedId) {cancelCollect(selectedId);}
                }}
            />

            <FormModel 
                defaultEnName={selectedText}
                currentMetadata={currentMetadata}
                showForm={showForm} 
                setShowForm={()=>setShowForm(false)}
            />
		</div>
		
    )
}