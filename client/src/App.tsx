import {Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import AuthLayout from "./components/AuthLayout";
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<AuthLayout />}>
        <Route path = "signup" element = {<Signup />} />
        <Route path = "login" element = {<Login />} />
      </Route>

      <Route path='/' element = {<Layout />}>
        <Route index element = {<Home />} />
    
        {/* protected routes  */}
        <Route element = {<RequireAuth />}>
          <Route path='welcome' element = {<Welcome />} />
        </Route>
      </Route>

      <Route path="*" element = {<Error404 />}></Route>
    </Routes>
  );
}

export default App;
