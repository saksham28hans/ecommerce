import {React, useContext, useState} from 'react';
import './login.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/apiCalls';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");  
  const {isFetching, dispatch} = useContext(AuthContext);

  const handleLogin = (e)=>{
    e.preventDefault();
    login({email,password},dispatch);
  }
  return (
    <div className='login'>
    <form className="loginForm">
        <input type="text" placeholder='Email' className="loginInput" onChange={(e)=>{setemail(e.target.value)}} />
        <input type="password" placeholder='Password' className="loginInput" onChange={(e)=>{setpassword(e.target.value)}} />
        <button className='loginButton' onClick={handleLogin} disabled={isFetching}>Log In</button>
    </form>
    </div>
  );
}

export default Login;
