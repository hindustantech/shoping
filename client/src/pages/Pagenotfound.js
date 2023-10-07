import React from "react";
// import Layout from '../components/Layout/Layout'
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi/";
const Pagenotfound = () => {
  return (
    <div className="pnf d-flex aling-item-center">
      <h1 className="pnf-title">404 </h1>
      <h1>
        <BiError />
      </h1>
      <h2 className="pnf-heading">Oops! Page Not Found</h2>
      <Link to="/" className="pnf-btn">
        Go To Back
      </Link>
    </div>
  );
};

export default Pagenotfound;
