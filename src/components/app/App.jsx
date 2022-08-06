import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'
import './Reset.css'
import GoodsList from '../goodsList/GoodsList'
import { Box } from '@mui/material'

const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{ maxWidth: '720px', margin: '0 auto', boxSizing: 'border-box', padding: '10px' }}>
                <Route path={'/'} component={GoodsList} exact />
            </Box>
        </BrowserRouter>
    )
}

export default App
