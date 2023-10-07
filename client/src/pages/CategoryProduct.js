import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
  const prams = useParams();
  const [products, setProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const navigate=useNavigate();
  const getProductbyCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product//Product-category/${prams.slug}`
      );
      setProducts(data?.products);
      setcategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (prams?.slug) getProductbyCat();
  }, [prams?.slug]);
  return (
    <Layout>
      <div>
        <div className="row">
          <div className="col-md-9">
        <h1 className="text-center">{category?.name}</h1>
        <h5 className="m-2"> Found Products {products?.length} </h5>
            

            <div className="d-flex flex-wrap w-85 m-3">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                    className="card-img-top"
                    style={{ height: "10rem" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Product Name : {p.name}</h5>
                    <p className="card-text">
                      Deces : {p.decs.substring(0, 15)}...
                    </p>
                    <h4 className="card-text"> price : {p.price} </h4>
                    <button
                      className="btn btn-primary ms-1 "
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      Deatils
                    </button>
                    <button className="btn btn-primary ms-3">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setpage(page + 1);
                  }}
                >
                  {loading ? "Lodinging..." : "Loreme"}
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
