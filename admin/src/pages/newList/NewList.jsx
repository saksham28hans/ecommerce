import {React,useState,useEffect} from 'react';
import './newList.css'
import storage from '../../firebase';
import { useContext } from 'react';
import { ListContext } from '../../context/listContext/ListContext';
import { createList } from '../../context/listContext/listApiCalls';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext/ProductContext';
import { getProducts } from '../../context/ProductContext/productsApiCalls';

const NewList = () => {
    const [list, setlist] = useState({});
    const {dispatch} = useContext(ListContext);
    const {movies, dispatch : dispatchProducts } = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
      getProducts(dispatchProducts)
    }, [dispatchProducts]);
    const handleChange = (e)=>
    {
        const value = e.target.value;
        setlist({...list , [e.target.name] : value})
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        createList(list,dispatch);
        navigate('/lists');
    }

    const handleSelect = (e)=>{
        let value = Array.from(e.target.selectedOptions, (option)=> option.value);
        setlist({...list, [e.target.name]:value});
    }
    
    console.log(list);
  return (
    <div className='newProduct'>
       <h1 className="addProductTitle">Add List</h1>
       <form className="addProductForm">
       <div className="formLeft">
        <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder='Popular Movies/Series' name="title"  onChange={handleChange}/>
        <div className="addProductItem">
        </div>
            <label>Genre</label>
            <input type="text" placeholder='Action' name="genre"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Type</label>
            <select name="type" id="type" onChange={handleChange}>
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
            </select>
        </div>
       </div>
       <div className="formRight">
        <div className="addProductItem">
            <label>Content</label>
            <select multiple name="content" id="content" onChange={handleSelect} style={{height : '300px'}}>
            {movies.map((movie)=>(
                <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
            </select>
        </div>
       </div>
        <button className="addProductButton" onClick={handleSubmit}>Create </button>
       </form>
    </div>
  );
}

export default NewList;
