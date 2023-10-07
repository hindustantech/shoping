import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { set } from "mongoose";
const ProductDetalis = () => {
  const params = useParams();
  const [product, setProducts] = useState({});
  const [realed, setRelated] = useState([]);
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
      GetRelatedProduct(data?.product._id, data.product.category._id);
    } catch (error) {}
  };
  useEffect(() => {
    if (params?.slug) getAllProduct();
  }, [params?.slug]);

  const GetRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-Product/${pid}/${cid}`
      );
      setRelated(data?.product);
      GetRelatedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {}
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-sm-4 col-12 text-center">
            <div className="card  mt-4 p-3">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${product._id}`}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-xl-9  col-sm-8 col-12">
            <div className="card mt-4">
              <div className="card-header">
                <h4 className="p-2 m-1">
                  {" "}
                  {product.name} <small>{product?.category?.name}</small>
                </h4>
              </div>
              <div className="card-body p-4 m-1">
                <p>
                  <b>Description :</b> {product.decs}
                </p>
                <p>
                  <b>Price :</b> &#8377; {product.price} &nbsp;
                  <del className="text-success">&#8377; {product.price}</del>
                </p>
              </div>
              <div className="card-footer pb-4">
                <div className="mt-3 text-center">
                  <button className="btn btn-primary px-3">
                    <i className="fa fa-shopping-cart"></i> Add To Cart
                  </button>
                  <button className="btn btn-danger px-3 mx-2">
                    <i className="fa fa-shopping-bag"></i> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row my-3">
          <h3 className="text-center pb-3">Related Products</h3>
          {realed.length < 1 && (
            <div className="card text-center mb-4">
              <p className="p-4 m-0 text-secondary">No Related Products Found</p>
            </div>
          )}
          <div className="d-flex flex-wrap">
            {realed?.map((r) => (
              <div className="card m-2">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${r._id}`}
                  className="card-img-top"
                  style={{ height: "10rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Product Name : {r.name}</h5>
                  <p className="card-text">
                    Deces : {r.decs.substring(0, 15)}...
                  </p>
                  <h4 className="card-text"> price : {r.price} </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetalis;
