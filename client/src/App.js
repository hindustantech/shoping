import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.css';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/PriveatRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Product from "./pages/Admin/Product";
import UpadateProduct from "./pages/Admin/UpadateProduct";
import Search from './pages/Search'
import ProductDetalis from "./pages/ProductDetalis";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";

function App() {
  return (
    <>
      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetalis />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/Categories" element={<Categories/>} />
        <Route path="/searchs" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/creat-category" element={<CreateCategory/>}/>
          <Route path="admin/creat-product" element={<CreateProduct/>}/>
          <Route path="admin/product" element={<Product/>}/>
          <Route path="admin/product/:slug" element={<UpadateProduct/>}/>
          <Route path="admin/users" element={<Users/>}/>
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
