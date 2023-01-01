import { Outlet } from "react-router-dom"
import { Stack } from "@mui/material"

const AuthLayout = () => {
  return (
    <Stack direction="column" style = {{minHeight: "100vh"}} justifyContent = "center" alignItems = "center" className="authbackground">
        <Outlet />
    </Stack>
  )
}

export default AuthLayout