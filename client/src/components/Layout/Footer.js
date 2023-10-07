import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer py-3">
        <p className="text-center">
          <Link to="/about">About</Link> | <Link to="/contact">contact</Link> |{" "}
          <Link to="/policy">Privacy Policy</Link>
        </p>
        <div className="text-center socialBtn mt-2">
          <a href="/" className="btn btn-sm">
            <i className=" fa fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="/" className="btn btn-sm">
            <i className=" fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="/" className="btn btn-sm">
            <i className=" fa fa-envelope" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <p className="text-center copywrite">
        &copy; ShopGenie | All Right Reserved
      </p>
    </>
  );
};

export default Footer;
