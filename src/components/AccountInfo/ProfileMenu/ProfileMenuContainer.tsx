import ProfileMenuUI from "./ProfileMenuUI";
import useProfileMenu from "./useProfileMenu";

export default function ProfilMenueContainer(){
    const {
        menuData,
        open,
        user,
        setOpen,
    } = useProfileMenu()
    return (
        <ProfileMenuUI
            src="/avatar.png"
            menuData={menuData}
            open={open}
            user={user}
            setOpen={setOpen}
        />

    )
}
