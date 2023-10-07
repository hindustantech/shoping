import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <nav
            id="sidebar"
            className="col-md-3 w-75 col-lg-2 d-md-block bg-light sidebar"
          >
            <div className="position-sticky">
              <ul className="nav flex-column">
                {/* Sidebar items */}

                <h1>ShopGenie</h1>

                <li className="nav-item">
                  <NavLink
                    to="/dashboard/admin/creat-category"
                    className="nav-link"
                  >
                    <i className=" fa fa-paint-brush" aria-hidden="true" />
                    <span>Creat Catgeory</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard/admin/creat-product"
                    className="nav-link"
                  >
                    <i className=" fa fa-paint-brush" aria-hidden="true" />
                    <span>CreatProduct</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard/admin/users" className="nav-link">
                    <i className="fa fa-paint-brush" aria-hidden="true" />
                    <span>Users</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard/admin/Orders" className="nav-link">
                    <i className="fa fa-paint-brush" aria-hidden="true" />
                    <span>Orders</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard/admin/product" className="nav-link">
                    <i className="fa fa-file-text-o" aria-hidden="true" />
                    <span> All Product List</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* Your page content goes here */}
          </main>
        </div>
      </div>
    </>
  );
};
export default AdminMenu;
