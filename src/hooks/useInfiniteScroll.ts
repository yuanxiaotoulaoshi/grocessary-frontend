import { useEffect,useRef } from 'react';

interface UseInfiniteScrollOptions {
  isLoading: boolean;
  isLastPage: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function useInfiniteScroll(
  targetRef: React.RefObject<HTMLElement>,
  { isLoading, isLastPage, onLoadMore, rootMargin = '30px' }: UseInfiniteScrollOptions
){
    const hasFirstLoadCompletedRef = useRef(false);
    useEffect(() => {
        if (!targetRef.current) return;
        if (isLoading || isLastPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (!hasFirstLoadCompletedRef.current) {
                    hasFirstLoadCompletedRef.current = true;
                    return;
                }
                if (firstEntry.isIntersecting && !isLoading && !isLastPage) {
                    onLoadMore();
                }
            },
            { rootMargin }
        );
        const el = targetRef.current;
        observer.observe(el);
        return () => {
            if (el) observer.unobserve(el);
        };

    },[isLoading, isLastPage, targetRef])
}