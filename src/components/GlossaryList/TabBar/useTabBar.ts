import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {request} from '../../../services/api';
import { RootState,AppDispatch } from "../../../store";
import {setActiveLevel1, setActiveLevel2, setCategoryInfo} from '../../../store/tabSlice';
export function useTabBar(
    fetchUrl:string = '/glossary/categories',
    initialLevel1:number = 0,
    initialLevel2:number = 0
){
    const dispatch = useDispatch<AppDispatch>();
    const {activeLevel1, activeLevel2ByLevel1} = useSelector((state: RootState) => state.selectedTab.curSelectedInfo)
    const categoryInfo = useSelector((state: RootState) => state.selectedTab.categoryInfo)
    const level1Tabs = Object.keys(categoryInfo);
    const currentLevel1Label = level1Tabs[activeLevel1]|| '';
    const level2Tabs = categoryInfo[currentLevel1Label]  || [];
    const activeLevel2 = activeLevel2ByLevel1[activeLevel1]?.[1]??initialLevel2;
    const setLevel1 = (i:number)=> dispatch(setActiveLevel1(i));
    const setLevel2 = (i:number)=> dispatch(setActiveLevel2({ level1: activeLevel1, level2: i }));

    useEffect(()=>{
        request({ method: 'GET', url: fetchUrl }).then((res) => dispatch(setCategoryInfo(res)));
    },[dispatch,fetchUrl]);

    return{
        level1Tabs,
        level2Tabs,
        activeLevel1,
        activeLevel2,
        setLevel1,
        setLevel2,
    }

}