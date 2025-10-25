import {createSlice} from '@reduxjs/toolkit';
export interface User{
    userName:string,
}
interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}
const initialState:AuthState = {
    isLoggedIn: false,
    user: null,
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout(state){
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})
export const {login,logout} = authSlice.actions;
export default authSlice.reducer;