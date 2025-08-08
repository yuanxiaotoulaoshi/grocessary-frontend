import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CategoryInfo{
    [key: string]: string[];
}

interface chunkTypeItem{
    text: string,
    id: string,
}

type ChunkType = chunkTypeItem[];

interface CurSelectedInfo {
    activeLevel1: number;
    activeLevel2ByLevel1: Array<[number, number]>;
    }

interface TabState{
    curSelectedInfo: CurSelectedInfo;
    categoryInfo: CategoryInfo;
    chunkType: ChunkType;
}

const initialState:TabState = {
    curSelectedInfo: {
        activeLevel1: 0,
        activeLevel2ByLevel1: [[0,0],[1,0],[2,0],[3,0]],
    },
    categoryInfo: {},
    chunkType: [],
}

const tabSlice = createSlice({
    name:'tab',
    initialState,
    reducers:{
        setActiveLevel1(state,action:PayloadAction<number>){
            state.curSelectedInfo.activeLevel1 = action.payload;
        },
        setActiveLevel2(state,action:PayloadAction<{ level1: number; level2: number }>){
            const foundIndex = state.curSelectedInfo.activeLevel2ByLevel1.findIndex(
                ([lvl1]) => lvl1 === action.payload.level1
            );
            if (foundIndex !== -1) {
                // 已存在，更新
                state.curSelectedInfo.activeLevel2ByLevel1[foundIndex][1] = action.payload.level2;
            } else {
                // 不存在，插入
                state.curSelectedInfo.activeLevel2ByLevel1.push([action.payload.level1, action.payload.level2]);
            }
        },
        setCategoryInfo(state,action:PayloadAction<CategoryInfo>){
            state.categoryInfo = action.payload;
        },
        setChunkType(state,action:PayloadAction<ChunkType>){
            state.chunkType = action.payload;
        },
    }
})

export const {
  setActiveLevel1,
  setActiveLevel2,
  setCategoryInfo,
  setChunkType,
} = tabSlice.actions;
export default tabSlice.reducer;