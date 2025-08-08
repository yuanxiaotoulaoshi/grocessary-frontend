// components/Layout.tsx
import { Link, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {login,logout} from '../store/authSlice';
import { useEffect } from 'react';
import {request} from '../services/api';

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isLoggedIn = useSelector((state:RootState)=>state.auth.isLoggedIn);
    const user = useSelector((state:RootState)=>state.auth.user);
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

    return (
        <div className="min-h-screen bg-white">
        {/* 固定导航栏 */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
            <Link to="/" className="text-2xl font-bold text-blue-600">
                Lexily
            </Link>
            <nav className="space-x-4">
            {isLoggedIn?(
                <>
                    <span className="text-blue-600 font-medium">
                        你好，{user?.userName || '用户'}
                    </span>
                    <button
                        onClick={() =>loginOut()}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                        退出登录
                    </button>
                </>
            ):(
                <>
                    <Link
                    to="/login"
                    className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                    登录
                    </Link>
                    <Link
                    to="/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                    注册
                    </Link>
                </>
            )}
                
            </nav>
            </div>
        </header>

        {/* 页面内容部分，注意顶部留 padding 避免导航栏遮挡 */}
        <main className="pt-24 px-4">{children}</main>
        </div>
    );
}
