import React,{useState} from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const CategoryProduct = () => {
    const prams=useParams();
  const[products,setProducts]=useState([]);
  const[category,setcategory]=useState([]);
  const getProductbyCat= async()=>{
    try {
        const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product//Product-category/${prams.slug}`)
        setProducts(data?.products);
        setcategory(data?.category)
    } catch (error) {
        console.log(error)
    }
  }
    return (
    <Layout>
        <div>
            <h1 className='text-center'>{category?.name}</h1>
        </div>
    </Layout>
  )
}

export default CategoryProduct