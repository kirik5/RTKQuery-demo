import React, { useState } from 'react'
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGetGoodsQuery } from '../../reducers/goodsApi'

const GoodsList = () => {
    const { partialGoods, totalPages, pageNumber } = useGetGoodsQuery('?pageSize=10', {
        selectFromResult: ({ data }) => ({
            partialGoods: data?.partialGoods,
            totalPages: data?.totalPages,
            pageNumber: data?.pageNumber,
        }),
    })

    console.log(pageNumber)

    // const [page, setPage] = useState(1)
    //
    // const handlePaginationClick = (event, page) => {
    //     setPage(page)
    // }

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
                    <Pagination
                        count={totalPages}
                        page={pageNumber + 1}
                        // onChange={handlePaginationClick}
                    />
                </Box>
            )}
        </>
    )
}

export default GoodsList
