import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useAddGoodMutation } from '../../reducers/goodsApi'

const AddGood = () => {
    let history = useHistory()

    const handleSaveNewGood = () => {
        console.log('save new good...')
        console.log('name = ', name)
        console.log('price = ', price)
        addGood({ name, price })
        history.goBack()
    }

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const [addGood] = useAddGoodMutation()

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
            <Button variant="contained" onClick={handleSaveNewGood}>
                Save new good
            </Button>
        </>
    )
}

export default AddGood
