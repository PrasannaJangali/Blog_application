import {Box,Typography,styled} from '@mui/material'
import React from 'react'

const Image = styled(Box)`
    width: 100vw;
    background: url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/55% ;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: black;
    line-height: 1
`;


function Banner() {
  return (
    <Image>
        <Heading>BLOG FOR YOU</Heading>
        
    </Image>
  )
}

export default Banner