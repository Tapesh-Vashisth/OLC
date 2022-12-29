import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUserName } from '../features/auth/authSlice';
import { NavLink } from 'react-router-dom';

const ProfileMenu = () => {
    const name = useAppSelector(selectCurrentUserName);

    return (
    <div className="dropup-center dropup">
        <div className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <AccountBoxIcon />
        </div>
        <ul className="dropdown-menu dropdown-menu-dark">
            <li>
                <p style = {{textAlign: "center"}} >hello,<br />{name}</p>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
                <NavLink to = "#" className="dropdown-item" style={{textDecoration: 'none', color: "white", background: "transparent"}}>view/edit profile</NavLink>
            </li>
            <li>
                <NavLink to = "#" className="dropdown-item" style={{textDecoration: 'none', color: "white", background: "transparent"}}>My ADs</NavLink>
            </li>
            <li>
                <NavLink to = "#" className="dropdown-item" style={{textDecoration: 'none', color: "white", background: "transparent"}}>Purchase History</NavLink>
            </li>
        </ul>
    </div>
    )
}

export default ProfileMenu