import { Grid } from '@mui/material'
import React from 'react'
import Banner from '../banner/Banner'
import Categories from './Categories'
import Posts from './post/Posts'

function Home() {
  return (
    <div>
        <Banner/>
        <Grid style={{width: 'auto'}} container>
            <Grid item lg={2} sm={2} xs={12}>
                <Categories/>
            </Grid>
            <Grid container item xs={12} sm={10} lg={10}>
                <Posts/>
            </Grid>
        </Grid>
    </div>
  )
}

export default Home