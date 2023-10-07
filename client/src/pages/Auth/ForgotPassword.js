import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/AuthStyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        
        {email,newPassword,question}
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/Login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethig worng");
    }
  };
  return (
    <Layout>
      <div className="flex d-flex justify-content-center">
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2> Reset password Page </h2>
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
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      name="password"
                      placeholder=" Enter new Password"
                      required
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      name="question"
                      placeholder="Enter key reset password"
                      required
                    />
                  </div>
                  <input className="button" type="submit" value="Reset" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
