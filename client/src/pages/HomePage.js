import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinners from "./../components/Spinners"
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const[total,setTotal]=useState(0);
  const[page,setpage]=useState(1);
  const[loading,setLoading]=useState(false)
  const getAllProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product_list/${page}`
      );
      setLoading(false)
      setProducts(data.product);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {
   if(!checked.length||!radio.length) 
   getAllProduct();
   
  }, [checked.length,radio.length]);

  useEffect(() => {
   if(checked.length||radio.length)
    filter_Products();
   
  }, [checked,radio]);

  const getTotal=async()=>{
    try
     {
      const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/Product-count`)
      setTotal(data?.total)
    } 
    catch (error) 
    {
      console.log(error)
    }
 };

 useEffect(()=>{
      if(page===1) return;
      LoadMore()
 },[page])
 const LoadMore= async()=>{
  try {
        setLoading(true);
        const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product_list/${page}`)
        setLoading(false)
        setProducts([...products, ...data?.product])
  } catch (error) {
    console.log(error)
    setLoading(false)
  }

 } 

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
  const filter_Products= async()=>{
    try {
        const{data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/Product-filter`,{checked,radio})
        setProducts(data?.product)
    } catch (error) {
      
    }
  } 
   
  return (
    <Layout title={"All Product  Best-Offers"}>
      <div className="container-fluid m-3 p-3">
      <div className="row mt-3">
        <div className="col-sm-3 ">
          <h4 className="text-center "> Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handelFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center "> Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {Prices?.map(p=>(
                <div key={p._id}>

                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">All Product </h1>

          <div className="d-flex flex-wrap w-85">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                  className="card-img-top"
                  style={{ height: "10rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Product Name : {p.name}</h5>
                  <p className="card-text">Deces : {p.decs.substring(0,15)}...</p>
                  <h4 className="card-text"> price : {p.price} </h4>
                  <button className="btn btn-primary ms-1 ">Deatils</button>
                  <button className="btn btn-primary ms-3">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">{
            products && products.length<total&&(
              <button className="btn btn-warning" onClick={
                (e)=>{
                e.preventDefault();
                setpage(page+1)
              }}>
                {loading?"Lodinging...":"Loreme"}
              </button>
            )
          }</div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;
