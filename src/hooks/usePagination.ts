import {useState, useCallback} from 'react';

interface UsePaginationOptions{
    pageSize:number;
    initialPage?:number;
}

export function usePagination(options:UsePaginationOptions){
    const {pageSize,initialPage=1} = options;
    const [pageIndex,setPageIndex] = useState(initialPage);
    const [isLastPage,setIsLastPage] = useState(false);

    const nextPage = useCallback(()=>{
        setPageIndex((prev)=>prev+1);
    },[])

    const reset = useCallback(()=>{
        setPageIndex(initialPage);
        setIsLastPage(false);
    },[initialPage]);

    const checkIfLastPage = useCallback((itemCount:number)=>{
        setIsLastPage(itemCount<pageSize);
    },[pageSize])

    return {
        pageIndex,
        isLastPage,
        nextPage,
        reset,
        checkIfLastPage,
        setPageIndex,
    }
}