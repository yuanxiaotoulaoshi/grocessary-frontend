// src/pages/Login.jsx
// 194654843404-ti5e6v4it68kr3dksjdmnqf08tthqti0.apps.googleusercontent.com
import { GoogleLogin ,CredentialResponse} from '@react-oauth/google';
import {useTranslation} from 'react-i18next';

interface LoginUIProps{
    userName:string;
    password:string;
    remember:boolean;
    handleLogin:(e:React.FormEvent<HTMLFormElement>)=>void;
    setUserName:React.Dispatch<React.SetStateAction<string>>;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
    setRemember:React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess:(credentialResponse:CredentialResponse)=>void;
    onError:()=>void;
}

export default function LoginUI({
    userName,
    password,
    remember,
    handleLogin,
    setUserName,
    setPassword,
    setRemember,
    onSuccess,
    onError,
}:LoginUIProps) {
	const {t} = useTranslation('login');
	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-50">
			<div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
				<h2 className="text-2xl font-bold text-center text-gray-900 mb-6">{t('login.title')}</h2>
				<form onSubmit={handleLogin}>
				<div className="mb-4">
					<input
					placeholder={t('login.usernamePlaceholder')}
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="w-full border-b border-gray-300 focus:outline-none focus:border-theme text-gray-800 py-2"
					required
					/>
				</div>
				<div className="mb-4">
					<input
					type="password"
					placeholder={t('login.passwordPlaceholder')}
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
					<label className="text-gray-700 text-sm">{t('login.remember')}</label>
				</div>
				<button
					type="submit"
					className="w-full bg-theme hover:bg-theme text-white font-bold py-2 rounded-full transition"
				>
					{t('login.loginButton')}
				</button>
				</form>

				<div className="flex justify-between mt-6 text-sm text-theme font-semibold">
				<a href="#" className="hover:underline">{t('login.forgetPassword')}</a>
				<a href="#" className="hover:underline">{t('login.createAccount')}</a>
				</div>

				<div className="my-6 border-b" />

				{/* 社交登录 */}
				<GoogleLogin
					onSuccess={onSuccess}
					onError={onError}
				/>

			</div>
		</div>
	);
}
