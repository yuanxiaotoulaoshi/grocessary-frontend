import {useTranslation} from 'react-i18next';
interface LoadMoreProps{
    isLoading:boolean;
    isLastPage:boolean;
    loadMoreRef:React.LegacyRef<HTMLDivElement>;
    dataList:any [];
}

export default function LoadMoreUI({
    isLoading,
    isLastPage,
    loadMoreRef,
    dataList
}:LoadMoreProps){
	const {t} = useTranslation('loadMore');
    return(
        <div className="flex flex-col items-center mt-6 space-y-2">
            {!isLoading && !isLastPage && <div className="text-theme cursor-pointer hover:underline text-sm" ref={loadMoreRef}></div>}
            {isLoading && <p className="text-gray-500 text-sm animate-pulse">{t('loadMore.isLoading')}</p>}
            {dataList.length === 0 && !isLoading && (
                <p className="text-center text-gray-500">{t('loadMore.emptyData')}</p>
            )}
            {isLastPage && dataList.length>0 && <p className="text-gray-400 text-sm">{t('loadMore.noMore')}</p>}
        </div>
    )
}