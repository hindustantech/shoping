import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/AuthStyle.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location=useLocation();
  
  const [auth,setAuth] =useAuth();
  
  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/Login`,
        {  email, password }
      );
      if (res.data.success) {
        
        toast.success(res.data.message);
        // alert("successfully login")
        setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token,
        })
        localStorage.setItem("auth",JSON.stringify(res.data));
        navigate(location.state||"/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethig worng")
    }
  };
  return (
    <Layout title="Login Page">
      <div className="flex d-flex justify-content-center">
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2> Login Page </h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={clickSubmit}>
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <input className="button" type="submit" value="Login" />
                  <button type="button" className="button" onClick={()=>{navigate('/forgot-password')}} > Forgot Password </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
