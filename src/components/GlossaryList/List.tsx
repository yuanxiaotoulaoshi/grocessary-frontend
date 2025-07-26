import React, { useState, useEffect, useMemo, useRef } from 'react';
import {setGlossaryList} from '../../store/glossarySlice';
import { useSelector, useDispatch } from 'react-redux';
import {request} from '../../services/api';
import {RootState,AppDispatch} from 'store';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import Volume from './Volume';
interface ListProps {
    searchTerm: string;
}

const List: React.FC<ListProps> = ({ searchTerm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const glossaryList = useSelector((state:RootState)=>state.glossary.glossaryList);
    const {activeLevel1,activeLevel2ByLevel1} = useSelector((state: RootState) => state.selectedTab.curSelectedInfo)

    const categoryInfo = useSelector((state: RootState) => state.selectedTab.categoryInfo)
    const level1Tabs = Object.keys(categoryInfo);
    const currentLevel1Label = level1Tabs[activeLevel1];
    const level2Tabs = categoryInfo[currentLevel1Label as keyof typeof categoryInfo]  || [];

    const [pageIndex, setPageIndex] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const PAGE_SIZE = 10;
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useInfiniteScroll(loadMoreRef, {
        isLoading,
        isLastPage,
        onLoadMore: () => {
            setPageIndex((prev) => prev + 1)
        }
    });

    const fetchGlossary = (reset = false) => {
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
          setIsLastPage(res.length < PAGE_SIZE);
          setIsLoading(false);
        });
    };

    useEffect(()=>{
        if(!categoryInfo||!level1Tabs.length) return;
        setPageIndex(1);
        setIsLastPage(false);
        fetchGlossary(true);
    },[categoryInfo,activeLevel1,activeLevel2ByLevel1])

    // loadMore
    useEffect(() => {
        // avoid triggering again when exchange category
        if (pageIndex === 1) return;
        fetchGlossary(false);
      }, [pageIndex]);

    const filteredList = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return glossaryList;
        return glossaryList.filter(
          (item) =>
            item.cnName.toLowerCase().includes(term) ||
            item.enName.toLowerCase().includes(term)
        );
    }, [glossaryList, searchTerm]);

    return (
        <div className="grid grid-cols-1 gap-4">
            {filteredList.map((item) => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded shadow hover:shadow-md transition">
                    <div className="basis-1/2 text-lg font-semibold">{item.cnName}</div>
                    <div className="flex basis-1/2 align items-center text-sm text-gray-500 overflow-hidden text-ellipsis">
                        <Volume text={item.enName}></Volume>
                        <div className='ml-[10px]'>{item.enName}</div>
                    </div>
                </div>
            ))}

            {/* loadmore */}
            <div className="flex flex-col items-center mt-6 space-y-2">
                {!isLoading && !isLastPage && <div className="text-blue-600 cursor-pointer hover:underline text-sm" ref={loadMoreRef}></div>}
                {isLoading && <p className="text-gray-500 text-sm animate-pulse">加载中...</p>}
                {filteredList.length === 0 && !isLoading && (
                    <p className="text-center text-gray-500">暂无数据</p>
                )}
                {isLastPage && filteredList.length>0 && <p className="text-gray-400 text-sm">没有更多了</p>}
            </div>
            
        </div>
    );
}

export default List;