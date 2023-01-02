import React, {useRef, useState, useEffect} from "react";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../features/auth/authSlice";
import { useSignupMutation } from "../features/auth/authApiSlice";
import LazyLoading from "../components/LazyLoading";
import { Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
require("../styles/loginSignup.css")


const Signup = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [errmsg, setErrmsg] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [signup, {isLoading}] = useSignupMutation();


    useEffect(() => {
        if (nameRef.current){
            nameRef.current.focus(); 
        }
    }, [])

    useEffect(() => {
        setErrmsg("");
    }, [email, pwd, name])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userData = await signup({name, email, password: pwd}).unwrap();
            dispatch(authActions.setCredentials({...userData}))
            setName("");
            setEmail("");
            setPwd("");
            navigate("/login");
        } catch (err: any) {
            if (!err){
                setErrmsg("no server response");
            }else if(err.originalStatus === 400){
                setErrmsg("missing username or password");
            }else if(err.originalStatus === 409){
                setErrmsg("user already exists");
            }else{
                setErrmsg("Signup failed");
            }
            
            if (errRef.current){
                errRef.current.focus();
            }
        }
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)};
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

                {errmsg ? <p ref = {errRef} className = "center error">{errmsg}</p>: null}

                <h1 className="center">Signup</h1>

                <form onSubmit={handleSubmit} className = "authForm">
                    <Stack direction = "column" spacing={2}>
                        <Stack direction = "column">
                            <label htmlFor="name">Name:</label>
                            <input
                                className="authInput"
                                type = "text"
                                id = "name"
                                ref = {nameRef}
                                value = {name}
                                onChange = {handleNameInput}
                                autoComplete = "off"
                                required 
                            />
                        </Stack>

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

                        <button className="authButton">Sign up</button>
                    </Stack>
                </form>
                    <NavLink to = "/login" className="center links">Login</NavLink>
            </Stack>
        }
        </>
    )
}

export default Signup