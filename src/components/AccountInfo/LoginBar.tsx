import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
 
export default function LoginBar(){
	const {t} = useTranslation('login');

    return (
        <>
            <Link
            to="/login"
            className="px-4 py-2 border border-theme text-theme rounded-lg hover:bg-theme/10 transition"
            >
            {t('login.title')}
            </Link>
            <Link
            to="/register"
            className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme/70 transition shadow-sm"
            >
            {t('register.title')}
            </Link>
        </>
    )
}