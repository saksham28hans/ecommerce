import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';

const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background:  url("/images/register_back.png") center;
        background-size: cover;
        display: flex;
        align-items : center;
        justify-content: center;
`;

const Wrapper = styled.div`
        position: relative;
        top: 2%;
        left: 27%;
        width : 30%;
        padding: 30px;
        background-color: #cacaca;
        border-radius: 5%;
        ${mobile({width : '75%',left:'0'})}
`;
const Title = styled.h1`
        font-size: 24px;
        font-weight: 500;
`;

const Form = styled.form`
        display: flex;
        flex-direction : column;
`;
const Input = styled.input`
        flex: 1;
        min-width: 60%;
        margin: 20px 0px;
        padding: 15px;
        border: none;

        &:focus
        {
            outline: none;
        }
        
`;


const Button = styled.button`
        width: 40%;
        border:none;
        padding: 15px 20px;
        background-color: teal;
        color: white;
        cursor: pointer;
        margin: 10px 0px;
        &:disabled{
                color:green;
                cursor:not-allowed;
        }
;`

const Link = styled.a`
        margin: 5px 0px;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
`;

const Error = styled.span`
      color :red;
`

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector(state=>state.user)
  const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch,{email,password})

  }
  console.log(isFetching)
  return (
    <Container>
    <Wrapper>
      <Title>SIGN IN</Title>
      <Form>
          <Input placeholder="Email" type="email" onChange={(e)=>{setemail(e.target.value)}}/>
          <Input placeholder="Password" type="password" onChange={(e)=>{setpassword(e.target.value)}}/>
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went Wrong</Error>}
          <Link>Forgot Password</Link>
          <Link>Create a New Account</Link>
      </Form>
    </Wrapper>
  </Container>
  );
}

export default Login;
