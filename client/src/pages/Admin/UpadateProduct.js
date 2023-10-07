import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Select } from "antd";
const { Option } = Select;
const UpadateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [decs, setDecs] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //  get singal Product
  const getSingaleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDecs(data.product.decs);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shpping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingaleProduct();
    // eslint-disable-next-line
  }, []);
  // get all category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete( `${process.env.REACT_APP_API}/api/v1/product/delet-product/${id}`);
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const P_Data = new FormData();
      P_Data.append("name", name);
      P_Data.append("decs", decs);
      P_Data.append("price", price);
      P_Data.append("quantity", quantity);
      photo && P_Data.append("photo", photo);
      P_Data.append("category", category);
      
      const { data } =  axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        P_Data
      );
      if (data?.success) {

        toast.error(data?.message);
      } else {

        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong ");
    }
  };
  return (
    <Layout title={" Update Product "}>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Update Product</h1>
            <div className="m-1 w-50">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <Form.Group>
                  <Form.Label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload Photo"}
                    <Form.Control
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                      hidden
                    />
                  </Form.Label>
                </Form.Group>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      // src={URL.createObjectURL(photo)}
                      src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${id}`}
                      alt=""
                      className="img img-responsive"
                      />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                    // src={URL.createObjectURL(photo)}
                      src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${id}`}
                      alt=""
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  value={name}
                  placeholder="Enter Product name"
                  className="form-control "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  rows="5"
                  cols="5"
                  value={decs}
                  placeholder="Enter Product Deces"
                  className="form-control"
                  onChange={(e) => setDecs(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Enter Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Enter Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Form.Select
                  size="lg"
                  placeholder="Enter Product "
                  className="form-control"
                  onChange={(e) => setShipping(e.target.value)}
                  value={shipping?"yes":"NO"}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Select>
              </div>
              <div className="md-3">
                <button
                  className="btn btn-primary mb-3"
                  onClick={handleUpdateProduct}
                >
                  Update
                </button>
            
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpadateProduct;
