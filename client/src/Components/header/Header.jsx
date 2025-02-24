
import React from 'react'
import { Toolbar,styled } from '@mui/material';
import { Link } from 'react-router-dom';
const Component=styled('div')`
    backgroud:#FFFFFF;
    color:black;
    margin-top: -50px;
`
const Container=styled(Toolbar)`
    justify-content:center;
    & > a{
        padding:20px;
        color:inherit;
        text-decoration:none;
    }
`

function Header(){
  return (
    <Component>
        <Container>
            <Link to='/'>HOME</Link>
            <Link to='/about'>ABOUT</Link>
            <Link to='/contact'>CONTACT</Link>
            <Link to='/login'>LOGOUT</Link>
        </Container>
    </Component>
  )
}

export default Header;