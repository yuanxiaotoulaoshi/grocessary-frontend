// src/pages/Login.jsx
// 194654843404-ti5e6v4it68kr3dksjdmnqf08tthqti0.apps.googleusercontent.com
import { useState } from 'react';
import {request} from '../services/api';
import {login} from '../store/authSlice';
import {useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
// import * as jwt_decode from "jwt-decode";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e:any) => {
    e.preventDefault();
    // TODO: 登录逻辑，例如 dispatch(loginThunk({ email, password }))
    request({
        method:'POST',
        url:'/auth/login',
        data:{
            userName,
            password,
        },
    }).then((res)=>{
        console.log("rssss",res)
        return request({ method:'GET',url:'/auth/me',})
    }).then(user=>{
        console.log("userrrr",user)
        dispatch(login(user))
        navigate('/');
    }).catch(err=>{
        console.log(err)
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">登录</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              placeholder="用户名或邮箱"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-theme text-gray-800 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-theme text-gray-800 py-2"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700 text-sm">记住密码</label>
          </div>
          <button
            type="submit"
            className="w-full bg-theme hover:bg-theme text-white font-bold py-2 rounded-full transition"
          >
            登录
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-theme font-semibold">
          <a href="#" className="hover:underline">忘记密码?</a>
          <a href="#" className="hover:underline">创建新账户</a>
        </div>

        <div className="my-6 border-b" />

        {/* 社交登录 */}
        <GoogleLogin
            onSuccess={credentialResponse => {
                    const token = credentialResponse.credential; // Google ID token
                    if (!token) throw new Error('Google credential is missing');
                    const base64Url = token?.split('.')[1]; // JWT payload
                    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(
                        atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join(''),
                    );
                    const userInfo = JSON.parse(jsonPayload);
                    console.log(userInfo); // email, name, picture 等

                    request({
                        method:'POST',
                        url:'/auth/google',
                        data:{
                            id_token: token ,
                        },
                    }).then((res)=>{
                        console.log("resss",res)
                        return request({ method:'GET',url:'/auth/me',})
                    }).then(user=>{
                        dispatch(login(user))
                        navigate('/');
                    })
                }}
                onError={() => {
                    console.log('Google 登录失败');
                }}
            />

      </div>
    </div>
  );
}
