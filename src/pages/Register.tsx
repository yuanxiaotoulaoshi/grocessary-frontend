// src/pages/Login.jsx
import { useState } from 'react';
import {request} from '../services/api';


export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e:any) => {
    e.preventDefault();
    // TODO: 登录逻辑，例如 dispatch(loginThunk({ email, password }))
    request({
            method: 'POST',
            url: '/user/register',
            data: {
                userName,
                password,
                email,
            },
        }).then((res) => {
            console.log('register result', res)
        });
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">注册</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="userName"
              placeholder="用户名"
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

          <div className="mb-4">
            <input
              type="email"
              placeholder="电子邮件"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-theme text-gray-800 py-2"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-theme hover:bg-theme text-white font-bold py-2 rounded-full transition"
          >
            创建账户
          </button>
        </form>

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
