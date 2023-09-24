import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetalis = () => {
  const params = useParams();
  const [product, setProducts] = useState({});
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
    } catch (error) {}
  };
  useEffect(() => {
    if (params?.slug) getAllProduct();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6 mt-2">
          Image
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
          <h4>Category : {product.category.name}</h4>
          <h4> price : {product.price}</h4>
          <div className="mt-3">
            <button className="btn btn-primary m-2">Add To Cart</button>
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
      <div className="row">Similar products </div>
    </Layout>
  );
};

export default ProductDetalis;
