import Volume from '../Volume';

type glossaryItem = {
    id:string,
    cnName:string,
    enName:string,
    categoryLevel1:string,
    categoryLevel2:string,
    currentMetadata:string,
} 

interface ListProps {
    filteredList: glossaryItem[];
    currentLevel1Label:string;
    isLoading:boolean;
    isLastPage:boolean;
    loadMoreRef:React.LegacyRef<HTMLDivElement>;
    handlePlay:(item:glossaryItem)=>void;
}

export default function ListUI({ 
    filteredList,
    handlePlay,
    currentLevel1Label,
    isLoading,
    isLastPage,
    loadMoreRef,
}:ListProps) {    
    return (
        <div className="grid grid-cols-1 gap-4">
            {filteredList.map((item) => (
                <div 
                    key={`glossary-${item.id}`} 
                    className="flex items-center bg-white p-4 rounded shadow hover:shadow-md transition"
                    onClick={() => handlePlay(item)}
                >
                    {currentLevel1Label!=='Collocations'&&<div className="basis-1/2 text-lg font-semibold">{item.cnName}</div>}
                    <div className="flex basis-1/2 align items-center text-sm text-gray-500 overflow-hidden text-ellipsis">
                        <Volume/>
                        <div className='ml-[10px]'>{item.enName}</div>
                    </div>
                </div>
            ))}

            {/* loadmore */}
            <div className="flex flex-col items-center mt-6 space-y-2">
                {!isLoading && !isLastPage && <div className="text-theme cursor-pointer hover:underline text-sm" ref={loadMoreRef}></div>}
                {isLoading && <p className="text-gray-500 text-sm animate-pulse">加载中...</p>}
                {filteredList.length === 0 && !isLoading && (
                    <p className="text-center text-gray-500">暂无数据</p>
                )}
                {isLastPage && filteredList.length>0 && <p className="text-gray-400 text-sm">没有更多了</p>}
            </div>
            
        </div>
    );
}