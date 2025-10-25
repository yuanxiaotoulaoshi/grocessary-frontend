// components/Layout.tsx
import { Link } from 'react-router-dom';
import LoginBar from './AccountInfo/LoginBar';
import ProfileMenu from './AccountInfo/ProfileMenu/ProfileMenuContainer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {login,logout} from '../store/authSlice';
import { useEffect } from 'react';
import {request} from '../services/api';

export default function Layout({ children }: { children: React.ReactNode }) {
    const isLoggedIn = useSelector((state:RootState)=>state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(()=>{
        request({
            method:'GET',
            url:'/auth/me',
        }).then(res=>{
            dispatch(login(res))
        }).catch((err)=>{
            console.log(err)
            dispatch(logout())
        })
    },[])

    return (
        <div className="min-h-screen bg-white">

        <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="text-2xl font-bold text-theme">
                    Lexily
                </Link>
                <nav className="space-x-4">
                    {
                        isLoggedIn? <ProfileMenu/> : <LoginBar/>
                    }
                </nav>
            </div>
        </header>

        {/* 页面内容部分，注意顶部留 padding 避免导航栏遮挡 */}
        <main className="pt-24 px-4">{children}</main>
        </div>
    );
}
