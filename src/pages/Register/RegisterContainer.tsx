import LoginUI from "./RegisterUI";
import useRegister from "./useRegister";
export default function RegisterContainer(){
    const {
        userName,
        password,
        email,
        handleRegister,
        setUserName,
        setPassword,
        setEmail,
    } = useRegister();
    return (
        <LoginUI
            userName={userName}
            password={password}
            email={email}
            handleRegister={handleRegister}
            setUserName={setUserName}
            setPassword={setPassword}
            setEmail={setEmail}
        />
    )
}