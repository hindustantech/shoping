import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './../components/Layout/Layout';
import { useSearch } from '../context/Search';
import ProductDetalis from './ProductDetalis';
const Search = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate()
  return (
    <Layout title={'Search Result'}>
        <div className='search result'>
            <div className='text-center'>
                <h1>Search</h1>
                <h6>{values?.results.length<1?"Product Not Found":`Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap w-85">
            {values?.results.map((p) => (
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
                  <button className="btn btn-primary ms-1 " onClick={()=>{navigate(`/products${p.slug}`)}}>Deatils</button>
                  <button className="btn btn-primary ms-3">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

            </div>
        </div>
    </Layout>
  )
}

export default Search