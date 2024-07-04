import React from 'react'
import {styled, Button,Table,TableHead, TableBody, TableCell, TableRow } from '@mui/material'
import { categories } from '../../constants/data.js'
import { Link,useSearchParams } from 'react-router-dom';
const Styledtable=styled(Table)`
    border:1px solid rgba(224,224,224,1);    
`;

const StyledBtn=styled(Button)`
    margin:20px;
    width:85%;
    background:#6495ed;
    color:white;
`
const StyledLink=styled(Link)`
    text-decoration:none;
    color:black;
`
function Categories() {
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');
  return (
    <>
    <Link to={`/create?category=${category||''}`}>
    <StyledBtn  variant='contained'>
        Create Blog
    </StyledBtn>
    </Link>
    <Styledtable>
    <TableHead>
        <TableRow>
            <TableCell>
                <StyledLink to='/' >
                All Categories
                </StyledLink>
            </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {
            categories.map(category=>{
                return <TableRow key={category.id}>
                    <TableCell>
                        <StyledLink  to={`/?category=${category.type}`}>
                        {category.type}
                        </StyledLink>
                    </TableCell>
                </TableRow>
            })
        }
    </TableBody>
    </Styledtable>
    </>
  )
}

export default Categories