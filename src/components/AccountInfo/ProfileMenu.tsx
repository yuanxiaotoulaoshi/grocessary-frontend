import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Power,CircleUserRound,SunMoon} from 'lucide-react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {request} from '../../services/api';
import {logout} from '../../store/authSlice';
import { useTheme } from '../../hooks/useTheme';

export default function ProfileMenu(){
    const user = useSelector((state:RootState)=>state.auth.user);
    const dispatch = useDispatch();
    const {dark, setDark} = useTheme();
    const [open, setOpen] = useState(false);
    
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

    return (
        (
            <>
                <Menu as="div" className="relative inline-block text-left">

                    <MenuButton 
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center w-full rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
                    >
                        <img
                            src="/avatar.png"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full mr-5"
                        />
                        <span className="font-medium">{user?.userName}</span>
                        <ChevronDownIcon
                            className={`w-5 h-5 transition-transform duration-100`}
                            style={{
                                transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
                                transformStyle: "preserve-3d"
                            }}
                        />
                    </MenuButton>


                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="p-2">
                            {menuData.map((item)=>{
                                return (
                                    <MenuItem key={item.id}>
                                        <div onClick={item.event} className="flex flex-row items-center hover:bg-gray-200 pl-2 pr-2 rounded-lg">
                                            <item.icon className="w-5 h-5"/>
                                            <a className="block w-full px-2 py-2 text-left text-sm">
                                            {item.text}
                                            </a>
                                        </div>
                                    </MenuItem>
                                )
                            })}
                        </div>
                    </MenuItems>
            
                </Menu>
            </>
        )
    )
}