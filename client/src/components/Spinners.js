// import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Spinners() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/Login",{
      state:location.pathname
    });
    
    return () => clearInterval(interval);
  }, [count, navigate,location]);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="loading"></div>
      <h1> Loading.... {count}</h1>
    </div>
  );
}

export default Spinners;
