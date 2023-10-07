import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);
 
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong");
    }
  };

  //lifecycle Metheod

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout title={"Product List "}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product Category</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                className="product-link"
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
              >
                <Card className="cart_product" style={{ width: "20rem",height:"25rem" ,margin: "2px" }}>
                  <Card.Img variant="top" style={{ height:"10rem" ,width:"15rem", padding:"4px" }} src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`} />
                  <Card.Body>
                    <Card.Title>
                      
                      Product Name : {p.name} 
                    </Card.Title>
                    <Card.Text>
                      price : {p.price}
                    </Card.Text>
                    <Card.Text>
                      Quantity : {p.quantity}
                    </Card.Text>
                    <Card.Text>
                      Deces : {p.decs}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
