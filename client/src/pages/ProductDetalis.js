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
      <div className="row container">
        <div className="col-md-6 mt-2">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${product._id}`}
            className="card-img-top"
            style={{ height: "20rem" }}
          />
        </div>
        <div className="col-md-6  mt-4" style={{ border: "2px solid black" }}>
          <h1 className="text-center">Products Deatals</h1>
          <h4>Name : {product.name}</h4>
          <h4>decs : {product.decs}</h4>
          <h4>Category : {product?.category?.name}</h4>
          <h4> price : {product.price}</h4>
          <div className="mt-3">
            <button className="btn btn-primary m-2">Add To Cart</button>
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
        <hr/>
      <div className="row ">
        <h1 className="text-center">related</h1>
        {realed.length<1&&(<p>No Related Parduct Founds</p>)}
        <div className="d-flex flex-wrap">
          {realed?.map((r) => (
            <div className="card m-2" style={{ width: "18rem" }}>
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
    </Layout>
  );
};

export default ProductDetalis;
