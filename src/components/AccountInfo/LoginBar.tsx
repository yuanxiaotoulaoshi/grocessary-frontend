import { Link } from 'react-router-dom';
export default function LoginBar(){
    return (
        <>
            <Link
            to="/login"
            className="px-4 py-2 border border-theme text-theme rounded-lg hover:bg-theme/10 transition"
            >
            登录
            </Link>
            <Link
            to="/register"
            className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme/70 transition shadow-sm"
            >
            注册
            </Link>
        </>
    )
}