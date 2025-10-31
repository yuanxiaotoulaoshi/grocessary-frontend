// src/pages/Login.jsx
import {useTranslation} from 'react-i18next';

interface RegisterUIProps{
    userName:string;
    password:string;
    email:string;
    handleRegister:(e:React.FormEvent<HTMLFormElement>)=>void;
    setUserName:React.Dispatch<React.SetStateAction<string>>;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
    setEmail:React.Dispatch<React.SetStateAction<string>>;
}

export default function RegisterUI({
    userName,
    password,
    email,
    handleRegister,
    setUserName,
    setPassword,
    setEmail,
}:RegisterUIProps) {
	const {t} = useTranslation('login');
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">{t('title')}</h2>
            <form onSubmit={handleRegister}>
            <div className="mb-4">
                <input
                type="userName"
                placeholder={t('usernamePlaceholder')}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-theme text-gray-800 py-2"
                required
                />
            </div>
            <div className="mb-4">
                <input
                type="password"
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-theme text-gray-800 py-2"
                required
                />
            </div>

            <div className="mb-4">
                <input
                type="email"
                placeholder={t('emailPlaceholder')}
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
                {t('createAccount')}
            </button>
            </form>

            <div className="my-6 border-b" />

            {/* 社交登录 */}
            <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center border border-gray-300 rounded-full py-2 hover:bg-gray-50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                {t('googleLogin')}
            </button>
            </div>
        </div>
        </div>
    );
}
