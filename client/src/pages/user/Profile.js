import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";


const Profile = () => {
  // Context
  const [auth, SetAuth] = useAuth();
  //State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if(data?.error){
        toast.error(data?.error)
      }
      else{
        SetAuth({...auth,user:data?.updateUser});
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls);
        ls.user=data.updateUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profileupdated Successfully")
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    const{name, email, phone, address}=auth.user
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  },[auth?.user])
  return (
    <Layout title={"Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-4">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="flex ">
              <div className="form_wrapper">
                <div className="form_container">
                  <div className="title_container">
                    <h2> User Profile </h2>
                  </div>
                  <div className="row clearfix">
                    <div className="justify-center">
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
                            
                          />
                        </div>

                        <div className="input_field">
                          <span>
                            <i
                              aria-hidden="true"
                              className="fa fa-envelope"
                            ></i>
                          </span>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="Email"
                            disabled
                            
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
                            
                          />
                        </div>

                        <input
                          className="button"
                          type="submit"
                          value="Update"
                        />

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
