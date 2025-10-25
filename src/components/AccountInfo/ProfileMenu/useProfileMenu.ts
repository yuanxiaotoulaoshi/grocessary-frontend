import { useState } from 'react';
import { Power,CircleUserRound,SunMoon} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {request} from '../../../services/api';
import {logout} from '../../../store/authSlice';
import { useTheme } from '../../../hooks/useTheme';

export default function useProfileMenu(){
    const {dark, setDark} = useTheme();
    const [open, setOpen] = useState(false);
    const user = useSelector((state:RootState)=>state.auth.user);
    const dispatch = useDispatch();

    const loginOut = ()=>{
        request({
            method:'POST',
            data:{},
            url:'/auth/logout',
        }).then(res=>{
            console.log('resss',res)
            dispatch(logout());
        })
    }

    type MenuDataType = {
        id:number,
        text: string;
        icon: React.ElementType;
        event: () => void;
        };

    const menuData:MenuDataType[] = [ 
        {id:0,text:dark?'亮色模式':'暗黑模式',icon:SunMoon,event:() => setDark(!dark)},
        {id:1,text:'个人档案',icon:CircleUserRound, event:() => {}},
        {id:2,text:'退出登录',icon:Power,event:loginOut}
    ]
    return {
        user,
        open,
        menuData,
        loginOut,
        setOpen,
    }
}