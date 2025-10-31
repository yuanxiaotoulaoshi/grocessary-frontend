import { useState } from 'react';
import { Power,CircleUserRound,SunMoon} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {request} from '../../../services/api';
import {logout} from '../../../store/authSlice';
import { useTheme } from '../../../hooks/useTheme';
import {useTranslation} from 'react-i18next';


export default function useProfileMenu(){
    const {dark, setDark} = useTheme();
    const [open, setOpen] = useState(false);
    const user = useSelector((state:RootState)=>state.auth.user);
    const dispatch = useDispatch();
	const {t} = useTranslation('profileMenu');

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
        {id:0,text:dark? t('menu.lightModal'):t('menu.darkModal'),icon:SunMoon,event:() => setDark(!dark)},
        {id:1,text:t('menu.personalProfile'),icon:CircleUserRound, event:() => {}},
        {id:2,text:t('menu.loginOut'),icon:Power,event:loginOut}
    ]
    return {
        user,
        open,
        menuData,
        loginOut,
        setOpen,
    }
}