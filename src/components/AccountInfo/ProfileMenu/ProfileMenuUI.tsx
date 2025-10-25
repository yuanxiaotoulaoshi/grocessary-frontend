import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {User} from '../../../store/authSlice';

interface ProfileMenuProps {
    src:string;
    user:User|null;
    open:boolean;
    menuData:{ id: number; text: string; icon: React.ElementType; event: () => void }[];
    setOpen:(open:boolean)=>void;
}

export default function ProfileMenu({
    src,
    user,
    open,
    menuData,
    setOpen,
}:ProfileMenuProps){
    return (
        (<>
            <Menu as="div" className="relative inline-block text-left">

                <MenuButton 
                    onClick={() => setOpen(!open)}
                    className="inline-flex items-center justify-center w-full rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
                >
                    <img
                        src={src}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-5"
                    />
                    <span className="font-medium">{user?.userName}</span>
                    <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-100`}
                        style={{
                            transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
                            transformStyle: "preserve-3d"
                        }}
                    />
                </MenuButton>


                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-2">
                        {menuData.map((item)=>{
                            return (
                                <MenuItem key={item.id}>
                                    <div onClick={item.event} className="flex flex-row items-center hover:bg-gray-200 pl-2 pr-2 rounded-lg">
                                        <item.icon className="w-5 h-5"/>
                                        <a className="block w-full px-2 py-2 text-left text-sm">
                                        {item.text}
                                        </a>
                                    </div>
                                </MenuItem>
                            )
                        })}
                    </div>
                </MenuItems>
        
            </Menu>
        </>)
    )
}