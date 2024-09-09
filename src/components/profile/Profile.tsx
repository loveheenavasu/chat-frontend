import axiosInstance from "@/utils/axiosInstance";
import { removeLocalStorageItem } from "@/utils/localStorage";
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface ProfileData {
    email: '';
    firstname: '';
    lastname: '';

}
const Profile = () => {
    const [profileData, setProfiledata] = useState<ProfileData>()
    console.log(profileData?.email, 'profileData')
    const router = useRouter()

    const Aboutprofile = async () => {
        try {
            const response = await axiosInstance.get(`user/profile`);
            console.log(response.data, 'responseee')
            if (response?.data) {
                setProfiledata(response.data)
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    useEffect(() => {
        Aboutprofile()
    }, [])

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
                {profileData?.firstname.charAt(0)}
            </MenuButton>
            <MenuList p={'10px'}>
                <MenuGroup textColor={'black'} title={`${profileData?.firstname} ${profileData?.lastname}`}>
                    <MenuGroup mt={'-12px'} fontSize={'13px'} textColor={'grey'} fontWeight={'600'} title={profileData?.email}></MenuGroup>
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