import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import './app.css';
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import DisplayList from "./pages/displayList/DisplayList";
import List from "./pages/list/List"
import NewList from "./pages/newList/NewList"



function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
   <div>
      
      {user && <Topbar />}
      <div className="container">
       {user && <Sidebar /> }
        <Routes>
        <Route exact path="/login" element={user ? <Navigate to ='/'/>: <Login/>} />
        <Route exact path="/" element={user ? <Home/> : <Navigate to = '/login'/> } />
        {user &&
        <>
        <Route exact path="/users" element={<UserList />}/>
        <Route exact path="/user/:userId" element={<User />}/>
        <Route exact path="/newUser" element={<NewUser />}/>
        <Route exact path="/products" element={<ProductList />}/>
        <Route exact path="/product/:productId" element={<Product />}/>
        <Route exact path="/newProduct" element={<NewProduct />}/>
        <Route exact path="/lists" element={<DisplayList />}/>
        <Route exact path="/list/:listId" element={<List />}/>
        <Route exact path="/newList" element={<NewList />}/> 
        </> 
        }
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
