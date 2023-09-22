import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
      <div>
        <div className="">
          <nav className="navm-4">
            <div className="navbar " id="navbarWEX">
              <h1>ShopGenie</h1>

              <NavLink
                href="#"
                to="/dashboard/user/Profile"
                className="nav-link"
              >
                <i className="fa fa-file-text-o" aria-hidden="true" />
                <span>Profile</span>
              </NavLink>
              <NavLink
                href="#"
                to="/dashboard/user/Orders"
                className="nav-link"
              >
                <i className="fa fa-commenting-o" aria-hidden="true" />
                <span> Your Order</span>
              </NavLink>


            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default UserMenu