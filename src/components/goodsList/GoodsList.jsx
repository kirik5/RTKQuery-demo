import React, { useState } from 'react'
import {
    Box,
    Button,
    CircularProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useDeleteGoodMutation, useGetGoodsQuery } from '../../reducers/goodsApi'
import { useHistory } from 'react-router-dom'

const GoodsList = () => {
    const [query, setQuery] = useState(`?pageSize=10&pageNo=0`)

    // const [skip, setSkip] = useState(true)

    const { partialGoods, totalPages, pageNumber, isLoadingGoods, isFetchingGoods, isErrorGoods } = useGetGoodsQuery(query, {
        // skip: skip,
        selectFromResult: ({ data, isLoading, isFetching, isError }) => ({
            partialGoods: data?.partialGoods,
            totalPages: data?.totalPages,
            pageNumber: data?.pageNumber,
            isLoadingGoods: isLoading,
            isFetchingGoods: isFetching,
            isErrorGoods: isError,
        }),
    })

    // console.log(isFetchingGoods)

    const handlePaginationClick = (event, page) => {
        setQuery(`?pageSize=10&pageNo=${page - 1}`)
    }

    // const handleButtonClick = () => setSkip(false)

    let history = useHistory()

    const handleGoodAdd = () => history.push('/add')

    const [deleteGood] = useDeleteGoodMutation()

    const handleDeleteGood = id => () => {
        console.log('delete good ', id)
        deleteGood(id)
    }

    return (
        <>
            {/*<Button variant="contained" onClick={handleButtonClick} disabled={!skip}>*/}
            {/*    Start fetch data*/}
            {/*</Button>*/}

            <Button variant="contained" onClick={handleGoodAdd}>
                Add new good
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell></TableCell>
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
                                    <TableCell>
                                        <Button variant="contained" onClick={handleDeleteGood(good.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPages && (
                <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={totalPages} page={pageNumber + 1} onChange={handlePaginationClick} />
                </Box>
            )}
            {(isLoadingGoods || isFetchingGoods) && (
                <Box
                    sx={{
                        display: 'flex',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        height: '100%',
                        width: '100%',
                        transform: 'translate(-50% -50%)',
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {isErrorGoods && (
                <Box
                    sx={{
                        display: 'flex',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        height: '100%',
                        width: '100%',
                        transform: 'translate(-50% -50%)',
                    }}
                >
                    <Typography sx={{ color: 'red' }}>ERROR!!!</Typography>
                </Box>
            )}
        </>
    )
}

export default GoodsList
