import {React,useContext,useState,useEffect} from 'react';
import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext/ProductContext';
import { deleteProducts, getProducts } from '../../context/ProductContext/productsApiCalls';

const ProductList = () => {

    const [data, setdata] = useState(productRows);
    const {products,dispatch} = useContext(ProductContext);

    useEffect(() => {
     getProducts(dispatch);
    }, []);
    
    const handleDelete = (id)=>{
        deleteProducts(id,dispatch)
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
          field: 'product',
          headerName: 'Product',
          width: 200,
          editable: true,
          renderCell: (params)=>{
            return (
                <div className="productListItem">
                    <img className='productListImg' src={params.row.img} alt="" />
                    {params.row.title}
                </div>
            )
          }
        },
        {
          field: 'inStock',
          headerName: 'Stock',
          width: 120,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 120,
          editable: true,
        },
        {
          field : 'action',
          headerName : 'Action',
          width: 150,
          renderCell : (params)=>{
            return (
              <>
                <Link to={'/product/' + params.row._id} state={{product : params.row}}>
                <button className='productListEdit'>Edit</button>
                </Link>
                <DeleteOutline className='productListDelete' onClick = {()=>handleDelete(params.row._id)} />
              </>
            )
          }
        }
      ];
  return (
    <div className='productList'>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(r)=> r._id}
      />
    </div>
  );
}

export default ProductList;
