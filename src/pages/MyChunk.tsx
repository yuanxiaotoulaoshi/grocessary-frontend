import { useEffect, useState } from 'react';
import {request} from '../services/api';
import PrimaryTabBar from '../components/TabBar/PrimaryTabBar'
export default function MyChunk() {
    const [type, setType] = useState('idiomatic');
    const [chunkList, setChunkList] = useState([]);

    // loadmore
    const [pageIndex, setPageIndex] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const PAGE_SIZE = 10;
    // const loadMoreRef = useRef<HTMLDivElement>(null);
    // const listRef = useRef<HTMLDivElement>(null);
    const getChunkList = (reset = false)=>{
        request({
            method: 'GET',
            params:{
                pageIndex: reset ? 1 : pageIndex,
                pageSize: PAGE_SIZE,
                type,
            },
            url: '/chunk/chunkList',
        }).then((res)=>{
            console.log(res)
            setChunkList(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getChunkList()
    },[])

    return (
        <div>
            <PrimaryTabBar/>
            {chunkList.map((item,index) => (
                <li
                    key={index}
                    className={`p-4 rounded-2xl shadow flex justify-between items-center gap-4 transition cursor-pointer  hover:bg-gray-100`}
                >
                    <p className="text-gray-800">{item?.chunk}</p>
                </li>
            ))}
        </div>
    );
}
