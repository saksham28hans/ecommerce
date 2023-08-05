import {React,useContext,useState,useEffect} from 'react';
import './displayList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { deleteList, getLists } from '../../context/listContext/listApiCalls';
import { ListContext } from '../../context/listContext/ListContext';

const DisplayList = () => {

    const [data, setdata] = useState(productRows);
    const {lists,dispatch} = useContext(ListContext);

    useEffect(() => {
     getLists(dispatch);
    }, []);
    
    console.log(lists);
    const handleDelete = (id)=>{
       deleteList(id,dispatch);
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
          field: 'title',
          headerName: 'Title',
          width: 250,
          editable: true,
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 150,
          editable: true,
        },
        {
          field: 'genre',
          headerName: 'Genre',
          width: 150,
          editable: true,
        },
        {
          field : 'action',
          headerName : 'Action',
          width: 150,
          renderCell : (params)=>{
            return (
              <>
                <Link to={'/list/' + params.row._id} state={{list : params.row}}>
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
        rows={lists}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(r)=> r._id}
      />
    </div>
  );
}

export default DisplayList;
