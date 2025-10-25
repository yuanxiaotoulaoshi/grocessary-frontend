import ConfirmDialog from "components/Dialogue/CancelDialog";
import FormModalContainer from 'components/GlossaryList/FormModal/FormModalContainer';
import { FavoriteItem } from 'types/favoriteItem';

interface CollectUIProps{
    listRef:React.LegacyRef<HTMLDivElement>;
    favorites:FavoriteItem[];
    currentAudio:string;
    isLoading:boolean;
    isLastPage:boolean;
    showCancel:boolean;
    loadMoreRef:React.LegacyRef<HTMLDivElement>;
    selectedId:string;
    currentMetadata:string;
    selectedText:string;
    showForm:boolean;
    playAudio:(name:string,id:string)=>void;
    formatDate:(time:string)=>string|'--';
    handleDelete:(e:React.MouseEvent<HTMLButtonElement>,id:string)=>void;
    setShowCancel:(show:boolean)=>void;
    cancelCollect:(id:string)=>void;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}   

export default function Collect({
    listRef,
    favorites,
    currentAudio,
    isLoading,
    isLastPage,
    loadMoreRef,
    showCancel,
    selectedId,
    selectedText,
    currentMetadata,
    showForm,
    playAudio,
    formatDate,
    handleDelete,
    setShowCancel,
    cancelCollect,
    setShowForm,
}:CollectUIProps){
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
                    {favorites.map((item,index) => (
                        <li
                            onClick={() => playAudio(item.baseName,item.videoId)}
                            key={index}
                            data-base-name={item.baseName}
                            data-video-id={item.videoId}
                            className={`text-sentence p-4 rounded-2xl shadow flex justify-between items-center gap-4 transition cursor-pointer ${currentAudio === item.videoId ? 'bg-theme/10' : 'bg-white'} hover:bg-gray-100`}
                        >
                            <div className="flex-1">
                            <p className="text-gray-800">{item.sentence}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                时长: {(item.end - item.start).toFixed(2)} 秒 | 收藏日期: {formatDate(item.collectedAt)}天前
                            </p>
                            </div>
                            <div className="flex gap-2">
        
                                <button
                                    onClick={(e) => handleDelete(e,item._id)}
                                    className="px-4 py-2 bg-theme text-white rounded-xl hover:bg-theme transition"
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
                {!isLoading && !isLastPage && <div className="text-theme cursor-pointer hover:underline text-sm" ref={loadMoreRef}></div>}
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

            {showForm && (<FormModalContainer 
                defaultEnName={selectedText}
                currentMetadata={currentMetadata}
                showForm={showForm}
                theme='light'
                className=''
                setShowForm={setShowForm}
            />)}
		</div>
		
    )
}