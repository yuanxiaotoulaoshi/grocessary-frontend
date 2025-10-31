import { useState } from 'react';
import {request} from 'services/api';

export default function useRegister(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = (e:React.FormEvent<HTMLFormElement>) => {
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

    return{
        userName,
        password,
        email,
        handleRegister,
        setUserName,
        setPassword,
        setEmail,
    }
}