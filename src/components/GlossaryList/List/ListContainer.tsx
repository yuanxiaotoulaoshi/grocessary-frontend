import { useRef } from 'react';
import ListUI from './ListUI';
import useList from './useList';
import { useSearch } from 'hooks/useSearch';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { GlossaryItem } from 'types/glossary';

interface listContainerProps{
    searchTerm:string;
}

export default function ListContainer({searchTerm}:listContainerProps){
    const{
        glossaryList,
        currentLevel1Label,
        isLoading,
        isLastPage,
        handlePlay,
        loadMore,
    } = useList()

    const loadMoreRef = useRef<HTMLDivElement>(null);

    const filteredList = useSearch<GlossaryItem>({
        data: glossaryList,
        searchTerm,
        searchFields: ['cnName', 'enName'],
    });

    useInfiniteScroll(loadMoreRef, {
        isLoading,
        isLastPage,
        onLoadMore: loadMore,
    });

    return(
        <ListUI 
            filteredList={filteredList}
            currentLevel1Label={currentLevel1Label}
            isLoading={isLoading}
            isLastPage={isLastPage}
            loadMoreRef={loadMoreRef}
            handlePlay={handlePlay}
        />
    )
}