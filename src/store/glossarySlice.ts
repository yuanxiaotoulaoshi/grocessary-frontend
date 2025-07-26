import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GlossaryItem {
  id:string,
  cnName:string,
  enName:string,
  categoryLevel1:string,
  categoryLevel2:string,
}

interface GlossaryState{
  glossaryList:GlossaryItem[];
}

const initialState:GlossaryState = {
  glossaryList:[],
}

const glossarySlice = createSlice({
  name:'glossary',
  initialState,
  reducers:{
    setGlossaryList(state,action:PayloadAction<GlossaryItem[] >){
      state.glossaryList = action.payload;
    },
    addGlossaryItem(state,action:PayloadAction<GlossaryItem>){
      state.glossaryList.push(action.payload);
    },
  }
})

export const {
  setGlossaryList,
  addGlossaryItem,
} = glossarySlice.actions;
export default glossarySlice.reducer;