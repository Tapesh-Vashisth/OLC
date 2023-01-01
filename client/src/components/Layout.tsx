import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Stack sx = {{minHeight: "100vh", background: "rgb(245, 239, 130, 0.5)"}} rowGap = "30px" justifyContent = "space-between">
      <Navbar />
      <section style = {{flexGrow: 1}}>
        <Outlet />
      </section>
      <Footer />
    </Stack>
  )
}

export default Layout