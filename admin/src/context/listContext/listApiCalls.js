import { createListFailure, createListStart, createListSuccess, deletelistFailure, deletelistStart, deletelistSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListActions";
import axios from "axios";

export const getLists = async(dispatch)=>{
    dispatch(getListsStart());
    try {
        const res = await axios.get('/lists',{
            headers : {
                token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getListsSuccess(res.data));
    } catch (error) {
        dispatch(getListsFailure());
    }
}

export const createList = async(list, dispatch)=>{
    dispatch(createListStart());
    try {
      const res =   await axios.post('/lists',list,{
            headers : {
                token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createListSuccess(res.data));
    } catch (error) {
        dispatch(createListFailure());
    }
}

export const deleteList = async(id, dispatch)=>{
    dispatch(deletelistStart());
    try {
        await axios.delete('/lists/'+id,{
            headers : {
                token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deletelistSuccess(id));
    } catch (error) {
        dispatch(deletelistFailure());
    }
}