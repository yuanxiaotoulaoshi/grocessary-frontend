import LoginUI from "./LoginUI";
import useLogin from "./useLogin";
export default function LoginContainer(){
    const {
        userName,
        password,
        remember,
        handleLogin,
        setUserName,
        setPassword,
        setRemember,
        onSuccess,
        onError,
    } = useLogin();
    return (
        <LoginUI
            userName={userName}
            password={password}
            remember={remember}
            handleLogin={handleLogin}
            setUserName={setUserName}
            setPassword={setPassword}
            setRemember={setRemember}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}