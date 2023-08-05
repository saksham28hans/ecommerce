import {React,useState} from 'react';
import './newProduct.css'
import storage from '../../firebase';
import { useContext } from 'react';
import { createProducts } from '../../context/ProductContext/productsApiCalls';
import { ProductContext } from '../../context/ProductContext/ProductContext';

const NewProduct = () => {
    const [product, setproduct] = useState(null);
    const [img, setimg] = useState(null);
    const [uploaded, setuploaded] = useState(0);
    const {dispatch} = useContext(ProductContext);
    const [cat, setcat] = useState([]);
    const handleChange = (e)=>
    {
        const value = e.target.value;
        setproduct({...product , [e.target.name] : value})
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        createProducts(product,dispatch);
    }
    
    const handleCat = (e)=>{
         setcat(e.target.value.split(","))
         setproduct((prev)=>{
            return { ...prev, categories : e.target.value.split(",") };
        });
    }


    const upload = (items)=>{
       items.forEach((item)=>{
        const filename = new Date().getTime() + item.label + item.file.name;
        const uploadTask = storage.ref(`/items/${filename}`).put(item.file);
        uploadTask.on("state_changed",
        (snapshot)=>{
            console.log(snapshot);
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done.");
         },
         (err)=>{
            console.log(err);
         },
         ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                setproduct((prev)=>{
                    return { ...prev, [item.label]: url};
                });
                setuploaded((prev)=> prev+1);
            });
         }
         );
       });
    }

    const handleUpload  = (e)=>{
      e.preventDefault();
      upload([
        {file : img, label :'img'},
      ])
    }
    // console.log(movie);
  return (
    <div className='newProduct'>
       <h1 className="addProductTitle">Add Product</h1>
       <form className="addProductForm">
        <div className="addProductItem">
            <label>Image</label>
            <input type="file" id='img' onChange={(e)=>{setimg(e.target.files[0])}}/>
        </div>
        <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder='AirPods' name="title"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Description</label>
            <input type="text" placeholder='description' name="desc"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Categories</label>
            <input type="text" placeholder='jeans,shirt' name="desc"  onChange={handleCat}/>
        </div>
        <div className="addProductItem">
            <label>Price</label>
            <input type="number" placeholder='Price' name="price"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>In Stock?</label>
            <select name="inStock" id="active" onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
        </div>
        {uploaded === 1 ? (
        <button className="addProductButton" onClick={handleSubmit}>Create </button>
        ) :
        (
        <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
       </form>
    </div>
  );
}

export default NewProduct;
