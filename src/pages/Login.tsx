// src/pages/Login.jsx
import { useState } from 'react';
import {request} from '../services/api';
import {login} from '../store/authSlice';
import {useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 py-2"
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-full transition"
          >
            登录
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-blue-600 font-semibold">
          <a href="#" className="hover:underline">忘记密码?</a>
          <a href="#" className="hover:underline">创建新账户</a>
        </div>

        <div className="my-6 border-b" />

        {/* 社交登录 */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center border border-gray-300 rounded-full py-2 hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
            用谷歌账户登录
          </button>
        </div>
      </div>
    </div>
  );
}
