import { Tab, TabGroup, TabList } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import {setActiveLevel1,setActiveLevel2,setCategoryInfo} from '../../store/tabSlice';
import {request} from '../../services/api';
import {RootState, AppDispatch} from 'store'
import { useEffect } from 'react';

export default function TabBar() {
    const dispatch = useDispatch<AppDispatch>();
    const {activeLevel1, activeLevel2ByLevel1} = useSelector((state: RootState) => state.selectedTab.curSelectedInfo)
    const categoryInfo = useSelector((state: RootState) => state.selectedTab.categoryInfo)
    const level1Tabs = Object.keys(categoryInfo);
    const currentLevel1Label = level1Tabs[activeLevel1];
    const level2Tabs = categoryInfo[currentLevel1Label as keyof typeof categoryInfo]  || [];
    
    useEffect(()=>{
        request({
            method:'GET',
            url:'/glossary/categories',
        }).then((res)=>{
            dispatch(setCategoryInfo(res));
        })
    },[])

    return (
        <div className="w-full max-w-full mx-auto px-4 py-8">
            {/* 一级分类 Tabs  */}
            <TabGroup 
                selectedIndex={activeLevel1}
                onChange={(index1) => dispatch(setActiveLevel1(index1))}>
                <TabList className="flex space-x-2 mb-4">
                {level1Tabs.map((label) => (
                    <Tab
                    key={label}
                    className={({ selected }) =>
                        `px-4 py-2 rounded ${
                        selected ? 'bg-blue-600 text-white' : 
                        'bg-gray-200 text-gray-700'
                        }`
                    }
                    >
                    {label}
                    </Tab>
                ))}
                </TabList>
            </TabGroup>

            {/* 二级分类 */}
            <TabGroup 
                selectedIndex={activeLevel2ByLevel1[activeLevel1][1]}
                onChange={(index) => {
                dispatch(setActiveLevel2({ level1: activeLevel1, level2: index }));
                }}>
                <TabList className="flex space-x-2 mb-4">
                {level2Tabs.map((sub:any,i) => {
                    const selected = i === activeLevel2ByLevel1[activeLevel1][1];
                    return (
                    <Tab
                        key={sub}
                        className={`px-3 py-1 rounded transition ${
                        selected
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {sub}
                    </Tab>
                    );
                })}
                </TabList>
            </TabGroup>
        </div>
    );
}
