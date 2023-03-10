import {Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import AuthLayout from "./components/AuthLayout";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import RequireAuth from './components/RequireAuth';
import ViewProfile from "./pages/ViewProfile";
import SellCategory from "./pages/SellCategory";
import EditProfile from "./pages/EditProfile";
import Sell from "./pages/Sell";
import PurchaseHistory from "./pages/PurchaseHistory";
import ProductMain from "./pages/ProductMain";

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<AuthLayout />}>
        <Route path = "signup" element = {<Signup />} />
        <Route path = "login" element = {<Login />} />
      </Route>

      <Route path='/' element = {<Layout />}>
        <Route index element = {<Home />} />
        <Route path="product/:productId" element = {<ProductMain />} />
        {/* protected routes  */}
        <Route path="/" element = {<RequireAuth />}>
          <Route path="purchaseHistory" element = {<PurchaseHistory />} />
          <Route path="viewProfile" element = {<ViewProfile />} />
          <Route path="editProfile" element = {<EditProfile />} />
          <Route path="sell" element = {<Sell />} />
          <Route path="sell/:category" element = {<SellCategory />} />
        </Route>

      </Route>

      <Route path="*" element = {<Error404 />}></Route>
    </Routes>
  );
}

export default App;
