import axiosInstance from "@/utils/axiosInstance";
import { removeLocalStorageItem } from "@/utils/localStorage";
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";



const Profile = () => {

    const router = useRouter()
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.delete(`user/logout`);
            if (response?.data) {
                Cookies.remove("authToken");
                removeLocalStorageItem();
                router.push("/login");
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    };


    return (
        <Menu size={'sm'}>
            <MenuButton as={Button} borderRadius={'50px'} colorScheme={'blue'} textColor={'#fff'} mt={'-5px'}>
                P
            </MenuButton>
            <MenuList p={'10px'}>
                <MenuGroup textColor={'black'} title='Paras Sharma'>
                    <MenuGroup mt={'-12px'} fontSize={'13px'} textColor={'grey'} fontWeight={'600'} title="paras.js@zestgeek.com"></MenuGroup>
                    <MenuDivider />
                    <MenuItem textColor={'grey'}>Dashboard </MenuItem>
                    <MenuItem textColor={'grey'}>Account Settings </MenuItem>
                    <MenuDivider />
                    <MenuItem textColor={'grey'} onClick={handleLogout}>Sign out </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default Profile