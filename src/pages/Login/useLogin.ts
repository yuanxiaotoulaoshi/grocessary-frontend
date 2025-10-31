import { useState } from 'react';
import {request} from '../../services/api';
import {login} from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse} from '@react-oauth/google';

export default function useLogin(){
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
            return request({ method:'GET',url:'/auth/me',})
        }).then(user=>{
            dispatch(login(user))
            navigate('/');
        }).catch(err=>{
            console.log(err)
        })
    };

    const onSuccess = (credentialResponse:CredentialResponse) => {
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
    }

    const onError=() => {
        console.log('Google 登录失败');
    }

    return{
        userName,
        password,
        remember,
        handleLogin,
        setUserName,
        setPassword,
        setRemember,
        onSuccess,
        onError,
    }
}