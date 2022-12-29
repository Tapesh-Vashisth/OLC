import { useAppSelector } from "../store/hooks"
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const ProfileIcon = () => {
    const user = useAppSelector((state) => state.auth);
    return (
        user.profileImage ? 
        <img style = {{width: "40px", height: "40px", borderRadius: "100%"}} src={`data:${user.profileImage["image"]["contentType"]};base64,${btoa(String.fromCharCode(...new Uint8Array(user.profileImage["image"]["data"]["data"])))}`}  alt="" /> 
        : 
        <AccountBoxIcon />
    )
}

export default ProfileIcon