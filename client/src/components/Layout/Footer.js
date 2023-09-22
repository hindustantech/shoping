import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer ">
        <div className="mt-5">
          <h4 className="text-center">All Right Reserved &copy; ShopGenie</h4>
          <p className="text-center ">
            <Link to="/about">About</Link>|<Link to="/contact">contact</Link>|
            <Link to="/policy">Privacy & policy</Link>
          </p>
        </div>

        <div className=" text-center  icon ">
          <i className=" fa fa-instagram" aria-hidden="true"></i>
          <i className=" fa fa-facebook" aria-hidden="true"></i>
          <i className=" fa fa-envelope" aria-hidden="true"></i>
        </div>
      </div>
    </>
  );
};

export default Footer;
