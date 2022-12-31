import { useAppSelector } from "../store/hooks"
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const ProfileIcon = () => {
    const user = useAppSelector((state) => state.auth);
    return (
        user.profileImage ? 
        <img style = {{width: "40px", height: "40px", borderRadius: "100%"}} src={user.profileImage}  alt="" /> 
        : 
        <AccountBoxIcon />
    )
}

export default ProfileIcon