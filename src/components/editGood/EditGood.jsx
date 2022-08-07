import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGetGoodQuery, useUpdateGoodMutation } from '../../reducers/goodsApi'
import { Button, TextField } from '@mui/material'

const EditGood = () => {
    const { id } = useParams()

    console.log(parseInt(id))

    const { goodName, goodPrice } = useGetGoodQuery(parseInt(id), {
        skip: !parseInt(id),
        selectFromResult: ({ data }) => ({
            goodName: data?.name,
            goodPrice: data?.price,
        }),
    })

    useEffect(() => {
        if (goodName) {
            setName(goodName)
        }
        if (goodPrice) {
            setPrice(goodPrice)
        }
    }, [goodName, goodPrice])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const [updateGood] = useUpdateGoodMutation()

    let history = useHistory()

    const handleSaveEditedGood = () => {
        console.log('save changed good ', id)
        console.log('name = ', name)
        console.log('price = ', price)
        updateGood({ id, name, price })
        history.goBack()
    }

    return (
        <>
            <TextField
                id="outlined-basic"
                label="Название"
                variant="outlined"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <TextField id="outlined-basic" label="Цена" variant="outlined" value={price} onChange={event => setPrice(event.target.value)} />
            <Button variant="contained" onClick={handleSaveEditedGood}>
                Save changed good
            </Button>
        </>
    )
}

export default EditGood
