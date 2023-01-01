import React, {useState, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks"
import {Grid, Stack, Button} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useUpdateProfileMutation } from "../features/auth/authApiSlice";
import { authActions } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ConvertToBase64 from "../helper/ConvertToBase64";
import { useUpdateProfileImageMutation } from "../features/auth/authApiSlice";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const [profileImageShow, setProfileImageShow] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [description, setDesc] = useState<string>("");
  const [phoneNumber, setPhone] = useState<string>("");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();
  const [updateProfileImage] = useUpdateProfileImageMutation();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name && !description && !phoneNumber){
        alert("no changes made");
      } else {
        const updated = {name: name ? name: user.name, description: description ? description : user.description, phoneNumber: phoneNumber ? phoneNumber: user.phoneNumber}

        try {
          const response = await updateProfile(updated).unwrap();
          dispatch(authActions.updateProfile(updated));
          navigate("/viewProfile");
        } catch (err: any) {
          if (!err){
            alert("no server response");
          }else if(err.originalStatus === 401){
            alert("unauthorized");
          }else{
            alert("update failed");
          }
        }
      }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
        const file = e.target.files[0];
        const base64 = await ConvertToBase64(file);
        setProfileImage(base64);
    }
  }

  const handleProImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (profileImage){
      try {
        const response = await updateProfileImage({src: profileImage}).unwrap();
        dispatch(authActions.updateProfileImage(response.src));
      } catch (err: any) {
        alert("something went wrong!");
      }
    }
  }

  return (
    <Grid container columns = {12} spacing = {3} padding = {3}>
      <Grid item xs = {12} sm = {3}>
        <Stack direction = "column" spacing = {2} alignItems = "center">
          {
            user.profileImage ? 
            <img className = "proImage" src={user.profileImage}  alt="" /> 
            :
            <Stack className="proImage" style={{background: "grey"}} justifyContent = "center" alignItems = "center">No Image</Stack>
          }
          <form onSubmit={handleProImageSubmit}>
            <Stack direction = "column" spacing = {2}>
              <input type="file" onChange={handleFile} required />
              <Button type = "submit" style = {{background: "lightGreen"}}>Update</Button>
            </Stack>
          </form>
          <NavLink to = "/viewProfile" style = {{textDecoration: "none", textAlign: "center"}}><Button sx = {{background: "pink"}}>View profile</Button></NavLink>
        </Stack>
      </Grid>

      <Grid item xs = {12} sm = {9} sx = {{textAlign: {xs: "center", sm: "left"}}}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <Stack direction = "column" sx = {{border: "2px solid black"}} padding = {2}>
              <section>
                <h5 style={{borderBottom: "1px solid black", padding: "5px"}}>Basic Information</h5>
                <Grid container columns = {2} sx = {{textAlign: {xs: "center", sm: "left"}}}>
                  <Grid item xs = {2} sm = {1}>
                    <Stack direction = "column" padding = "20px" spacing={3}>
                      <input onChange={handleChangeName} className="authInput" type = "text" placeholder={`name: ${user.name}`}></input>
                      <textarea onChange = {handleChangeDesc} className="description" style = {{height: "90px"}} placeholder = {`Description: ${user.description}`}></textarea>
                    </Stack>
                  </Grid>
                  <Grid item xs = {2} sm = {1}>
                    <Stack direction = "column" padding = "20px" justifyContent="center" alignItems = "center">
                      <div>
                        <h6 style = {{fontWeight: "bold"}}>Why is it important</h6>
                        <p style = {{fontSize: "13px"}}>
                          OLX is built on trust. Help other people get to know you. Tell them about the things you like. Share your favorite brands, books, movies, shows, music, food. And you will see the results
                        </p>
                      </div>
                    </Stack>                    
                  </Grid>
                </Grid>
              </section>
              <hr />
              <section style = {{margin: "20px 0px"}}>
                <h5 style={{borderBottom: "1px solid black", padding: "5px"}}>Contact Information</h5>
                <Stack sx = {{textAlign: {xs: "center", sm: "left"}}}>
                    <Stack direction = "column" padding = "20px" spacing={3}>
                      <input className = "authInput" onChange={handleChangePhone} type = "text" placeholder={`Phone Number: ${user.phoneNumber}`}></input>
                      <p style = {{fontSize: "20px"}}>Email: {user.email}</p>
                    </Stack>
                </Stack>
              </section>

              <Button style = {{background: "lightGreen"}} type = "submit">Save Changes</Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  )
}

export default EditProfile