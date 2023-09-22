import React, { useState } from "react";
import axios from "axios";
import{useNavigate}from 'react-router-dom'
import Layout from "../../components/Layout/Layout";
import toast  from "react-hot-toast";
import '../style/AuthStyle.css'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const navigate=useNavigate();

  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone,question,address }
      );
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        navigate("/login");
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title="Registetation page">
        <div className="flex d-flex justify-content-center">
          <div className="form_wrapper">
            <div className="form_container">
              <div className="title_container">
                <h2> Registration </h2>
              </div>
              <div className="row clearfix">
                <div className="">
                  <form onSubmit={clickSubmit}>
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-phone"></i>
                      </span>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        name="name"
                        placeholder="Phone"
                        required
                      />
                    </div>

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
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-home"></i>
                      </span>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="name"
                        placeholder="Address"
                        required
                      />
                    </div>
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-reply"></i>
                      </span>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        name="name"
                        placeholder="Enter ans"
                        required
                      />
                    </div>
                    <input className="button" type="submit" value="Register" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
