import ProfileIcon from './ProfileIcon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCurrentUserName } from '../features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { authActions } from '../features/auth/authSlice';

const ProfileMenu = () => {
    const name = useAppSelector(selectCurrentUserName);
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logout().unwrap();
            dispatch(authActions.logOut());
            navigate("/");
        } catch (err) {
            alert("something went wrong");
        }
    }

    return (
    <div className="dropup-center dropup">
        <div className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <ProfileIcon />
        </div>
        <ul className="dropdown-menu dropdown-menu-dark">
            <li>
                <p style = {{textAlign: "center"}}>hello,<br />{name}</p>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
                <NavLink to = "/viewProfile" className="dropdown-item" style={{textDecoration: 'none', color: "white", background: "transparent"}}>view/edit profile</NavLink>
            </li>
            <li>
                <NavLink to = "/purchaseHistory" className="dropdown-item" style={{textDecoration: 'none', color: "white", background: "transparent"}}>Purchase History</NavLink>
            </li>
            <li>
                <div onClick={handleLogout} className="dropdown-item" style={{textDecoration: 'none', color: "white", background: "transparent"}}>LogOut</div>
            </li>
        </ul>
    </div>
    )
}

export default ProfileMenu