import React, {useRef, useState, useEffect} from "react";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import LazyLoading from "../components/LazyLoading";
import { Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
require("../styles/loginSignup.css");

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [errmsg, setErrmsg] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, {isLoading}] = useLoginMutation();

    useEffect(() => {
        if (emailRef.current){
            emailRef.current.focus(); 
        }
    }, [])

    useEffect(() => {
        setErrmsg("");
    }, [email, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userData = await login({email, password: pwd}).unwrap();
            dispatch(authActions.setCredentials({...userData}))
            setEmail("");
            setPwd("");
            navigate("/");
        } catch (err: any) {
            if (!err){
                setErrmsg("no server response");
            }else if(err.originalStatus === 400){
                setErrmsg("missing username or password");
            }else if(err.originalStatus === 401){
                setErrmsg("unauthorized");
            }else{
                setErrmsg("login failed");
            }
            
            if (errRef.current){
                errRef.current.focus();
            }
        }
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)};
    const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) => {setPwd(e.target.value)};


    return (
        <>
        {
            isLoading ? <LazyLoading />
            :
            <Stack direction = "column" spacing = {2} alignItems = "center">
                <NavLink to = "/">
                    <img src = "images/logo.png" className="logo" />
                </NavLink>

                {errmsg ? <p className="center error" ref = {errRef}>{errmsg}</p>: null}

                <h1 className="center">Login</h1>

                <form onSubmit={handleSubmit} className = "authForm">
                    <Stack direction = "column" spacing={2}>
                        <Stack direction = "column">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="authInput"
                                type = "text"
                                id = "email"
                                ref = {emailRef}
                                value = {email}
                                onChange = {handleEmailInput}
                                autoComplete = "off"
                                required 
                            />
                        </Stack>

                        <Stack direction = "column">
                            <label htmlFor="password">Password:</label>
                            <input
                                className="authInput"
                                type="password"
                                id = "password"
                                value = {pwd}
                                onChange = {handlePassInput}
                                autoComplete = "off"
                                required
                            />
                        </Stack>

                        <button className="authButton">Sign In</button>
                    </Stack>
                </form>
                <NavLink to = "/signup" className="center links">Sign up</NavLink>
            </Stack>
        }
        </>
    )
}

export default Login