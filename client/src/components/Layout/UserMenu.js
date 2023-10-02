import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="row">
        <nav className="col-md-4 w-75 col-lg-2 d-md-block bg-light sidebar">
          <h3>ShopGenie</h3>
          <div className="nav-link flex-column ">
              
            <NavLink to="/dashboard/user/Profile" className="nav-link">
              <i className="fa fa-file-text-o" aria-hidden="true" />
              <span>Profile</span>
            </NavLink>

            <NavLink to="/dashboard/user/Orders" className="nav-link">
              <i className="fa fa-commenting-o" aria-hidden="true" />
              <span> Your Order</span>
            </NavLink>

          </div>
        </nav>
      </div>
    </>
  );
};

export default UserMenu;
