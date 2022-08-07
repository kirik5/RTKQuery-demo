import React, { useState } from 'react'
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGetGoodsQuery } from '../../reducers/goodsApi'

const GoodsList = () => {
    const { partialGoods } = useGetGoodsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            partialGoods: data?.partialGoods,
        }),
    })

    console.log(partialGoods)

    const goods = [
        {
            id: 0,
            name: 'Name 01',
            price: 1000,
        },
        {
            id: 1,
            name: 'Name 02',
            price: 2000,
        },
        {
            id: 2,
            name: 'Name 03',
            price: 3000,
        },
    ]

    const totalPages = 10

    const [page, setPage] = useState(1)

    const handlePaginationClick = (event, page) => {
        setPage(page)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partialGoods &&
                            partialGoods.length !== 0 &&
                            partialGoods.map(good => (
                                <TableRow key={good.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {good.id}
                                    </TableCell>
                                    <TableCell>{good.name}</TableCell>
                                    <TableCell align="right">{good.price}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPages && (
                <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={totalPages} page={page} onChange={handlePaginationClick} />
                </Box>
            )}
        </>
    )
}

export default GoodsList
