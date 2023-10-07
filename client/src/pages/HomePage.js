import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Slider from "./Slider";

const HomePage = () => {
  const [cart, SetCart] = useCart();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product_list/${page}`
      );
      setLoading(false);
      setProducts(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filter_Products();
  }, [checked, radio]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/Product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);
  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product_list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //  handel Filter
  const handelFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

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
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // filter_products
  const filter_Products = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/Product-filter`,
        { checked, radio }
      );
      setProducts(data?.product);
    } catch (error) {}
  };

  Fancybox.bind("[data-fancybox]", {});

  return (
    <Layout title={"All Product | Best-Offers"}>
      <div className="container mt-4 mPage">
        <Slider />

        <div className="row">
          <div className="col-xl-3 col-sm-4 col-12">
            <h4>All Filter </h4>
            <hr />
            <div className="card my-3 p-3">
              <h5 className="my-2"> Category</h5>
              <div className="d-flex flex-column mb-3">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handelFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h5 className="my-2"> Price</h5>
              <div className=" d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-sm-9 col-12">
            <h4 className="text-center">All Product </h4>
            <hr />
            <div className="card my-3 p-4">
              <div className="row">
                {products?.map((product) => (
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="card my-3 product">
                      <div className="card-image">
                        <a
                          href={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${product._id}`}
                          data-fancybox="image"
                        >
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${product._id}`}
                            className="card-img-top"
                          />
                        </a>
                      </div>
                      <div className="card-footer">
                        <h4 className="card-title mb-3">{product.name}</h4>

                        <h6>
                          Price : &#8377; {product.price} &nbsp;
                          <del className="text-success">
                            &#8377; {product.price}
                          </del>
                        </h6>

                        <p>{product.decs.substring(0, 15)}...</p>
                        <br />
                        <div className="row text-center">
                          <div className="col-6">
                            <button
                              className="btn btn-primary btn-block"
                              onClick={() => {
                                navigate(`/product/${product.slug}`);
                              }}
                            >
                              <i className="fa fa-info"></i> Details
                            </button>
                          </div>
                          <div className="col-6">
                            <button
                              className="btn btn-danger btn-block"
                              onClick={() => {
                                SetCart([...cart, product]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, product])
                                );
                                toast.success("Item Added To Cart");
                              }}
                            >
                              <i className="fa fa-shopping-cart"></i> Add to
                              Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-2 p-3 text-center">
              {products && products.length < total && (
                <button
                  className={`${
                    loading ? "btn btn-info" : "btn btn-primary px-4"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setpage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "View More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
