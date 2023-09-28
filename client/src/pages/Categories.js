import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Categories = () => {
  const Categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
            {Categories.map((c) => (
              <Link to={`/category/${c.slug}`} className="btn btn-primary m-4">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
