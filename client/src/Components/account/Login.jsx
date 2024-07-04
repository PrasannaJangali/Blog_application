import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/dataProvider';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { API } from '../../service/api';

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

function Login({isUserAuthenticated}) {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const {setAccount} = useContext(DataContext);
    const imageURL = 'https://logo.com/image-cdn/images/kts928pd/production/d12dfdbd6b7501faf694ac42775f19451aee8805-324x328.png?w=1080&q=72&fm=webp';
    const [account, toggleAccount] = useState('login');

    const navigate=useNavigate();

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const toggleSignup = () => {
        account==='login'? toggleAccount('signup'):toggleAccount('login');        
        setSignup(signupInitialValues);
        setLogin(loginInitialValues);
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
        setSignup(signupInitialValues);
        setLogin(loginInitialValues);
    }

    const signupuser=async()=>{
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
        setSignup(signupInitialValues);
        setLogin(loginInitialValues);
    }

     
  return (
    <Component>
        <Image src={imageURL} alt="" />
        {
            account==='login' ?
        <Wrapper>
        <TextField variant='standard' onChange={(e) => onValueChange(e)} value={login.username} name='username' label='Enter Username'/>
        <TextField variant='standard' onChange={(e) => onValueChange(e)} value={login.password} name='password' label='Enter Password'/>
        {error && <Error>{error}</Error>}
        <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
        </Wrapper>
        :
        <Wrapper>
            <TextField variant="standard" onChange={(e) => onInputChange(e)} value={signup.name}  name='name' label='Enter Name' />
            <TextField variant="standard" onChange={(e) => onInputChange(e)} value={signup.username} name='username' label='Enter Username' />
            <TextField variant="standard" onChange={(e) => onInputChange(e)} value={signup.password} name='password' label='Enter Password' />
            {error && <Error>{error}</Error>}

            <SignupButton onClick={()=>signupuser()} >Signup</SignupButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()} >Already have an account</LoginButton>
        </Wrapper>
        }
    </Component>
  )
}

export default Login