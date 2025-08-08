import { useState,useEffect } from 'react';
import { Tab, TabGroup, TabList } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import {setChunkType} from '../../store/tabSlice';
import {request} from '../../services/api';
import {RootState, AppDispatch} from 'store'

export default function PrimaryTabBar() {
    const dispatch = useDispatch<AppDispatch>();
    const {chunkType} = useSelector((state: RootState) => state.selectedTab)
    const [curChunkType,setCurChunkType] = useState(0)

    useEffect(()=>{
        request({
            method:'GET',
            url:'/chunk/chunkType',
        }).then(res=>{
            console.log('chunk type:',res);
            dispatch(setChunkType(res))
        })
    },[])

    return (
        <div className="w-full max-w-full mx-auto px-4 py-8">
            {/* 一级分类 Tabs  */}
            <TabGroup 
                onChange={(index) => setCurChunkType(index)}>
                <TabList className="flex space-x-2 mb-4">
                {chunkType.map((item,i) => (
                    <Tab
                    key={i}
                    className={({ selected }) =>
                        `px-4 py-2 rounded ${
                        selected ? 'bg-blue-600 text-white' : 
                        'bg-gray-200 text-gray-700'
                        }`
                    }
                    >
                    {item.text}
                    </Tab>
                ))}
                </TabList>
            </TabGroup>
        </div>
    );
}
