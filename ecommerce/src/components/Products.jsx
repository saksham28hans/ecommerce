import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import ProductItem from './ProductItem';
import axios from 'axios';

const Container = styled.div`
        display:flex;
        padding:20px;
        flex-wrap : wrap;
        justify-content : space-between;
`

const Products = ({cat,filters,sorted}) => {
 const [products, setproducts] = useState([]);
 const [filteredProducts, setfilteredProducts] = useState([]);
 
 useEffect(() => {
   const getProducts = async ()=>{
    try {
      const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : `http://localhost:5000/api/products`);
      setproducts(res.data)
    } catch (error) {
      console.log(error)
    }
   }
   getProducts();
 }, [cat]);

  useEffect(() => {
    cat && setfilteredProducts(
      products.filter((item)=> 
      Object.entries(filters).every(([key,value])=>
      item[key].includes(value)
      )
      )
    )
  }, [cat,products,filters]);

  useEffect(() => {
    if(sorted === "newest")
    {
      setfilteredProducts((prev)=> 
      [...prev].sort((a,b)=> a.createdAt - b.createdAt));
    }
    else if(sorted === 'asc')
    {
      setfilteredProducts((prev)=> 
      [...prev].sort((a,b)=> a.price - b.price));
    }
    else
    {
      setfilteredProducts((prev)=> 
      [...prev].sort((a,b)=> b.price - a.price));
    }
  }, [sorted]);


  return (
    <Container>
       {cat 
       ? filteredProducts.map((product)=>(
        <ProductItem key={product._id} item={product} />
       ))
       : products.slice(0,8)
       .map((product)=>(
        <ProductItem key={product._id} item={product} />
       ))}
    </Container>
  );
}

export default Products;
