import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'
import './Reset.css'
import GoodsList from '../goodsList/GoodsList'
import { Box } from '@mui/material'
import AddGood from '../addGood/AddGood'
import ViewGood from '../viewGood/ViewGood'

const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{ maxWidth: '720px', margin: '0 auto', boxSizing: 'border-box', padding: '10px' }}>
                <Route path={'/'} component={GoodsList} exact />
                <Route path={'/add'} component={AddGood} exact />
                <Route path={'/view/:id?'} component={ViewGood} exact />
            </Box>
        </BrowserRouter>
    )
}

export default App
