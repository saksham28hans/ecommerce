import { createProductFailure, createProductStart, createProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductsFailure, getProductsStart, getProductsSuccess } from "./ProductActions";
import axios from "axios";

export const getProducts = async(dispatch)=>{
    dispatch(getProductsStart());
    try {
        const res = await axios.get('/products',{
            headers : {
                token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getProductsSuccess(res.data));
    } catch (error) {
        dispatch(getProductsFailure());
    }
}

export const createProducts = async(products, dispatch)=>{
    dispatch(createProductStart());
    try {
      const res =   await axios.post('/products',products,{
            headers : {
                token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createProductSuccess(res.data));
    } catch (error) {
        dispatch(createProductFailure());
    }
}

export const deleteProducts = async(id, dispatch)=>{
    dispatch(deleteProductStart());
    try {
        await axios.delete('/products/'+id,{
            headers : {
                token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}