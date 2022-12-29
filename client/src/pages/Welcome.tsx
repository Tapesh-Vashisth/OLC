import { useAppSelector } from "../store/hooks"
import { selectCurrentUserName } from "../features/auth/authSlice"
import { selectCurrentToken } from "../features/auth/authSlice"


const Welcome = () => {
    const name = useAppSelector(selectCurrentUserName);
    const token = useAppSelector(selectCurrentToken);

    return (
        <div>
            <h1>Welcome {name}</h1>
            <p>Your access token is: {token}</p>
        </div>
    )
}

export default Welcome