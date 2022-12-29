import {useLocation, Navigate, Outlet} from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useGetUserDetailsQuery } from "../features/auth/authApiSlice";
import LazyLoading from "./LazyLoading";

const RequireAuth = () => {
    const token = useAppSelector(selectCurrentToken);
    const location = useLocation();
    
    let user: any;
    user = useGetUserDetailsQuery();    
    
    return (
        token ?
            <Outlet />
            :
            user.isLoading || user.isFetching || user.isUninitialized ?
                <LazyLoading /> 
            :
            user.isError ?
                <Navigate to = "/login" state={{from: location}} replace />
            :
            user.isSuccess ?
                <Outlet />
            : 
                null

    )
}

export default RequireAuth