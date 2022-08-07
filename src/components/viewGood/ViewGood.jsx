import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetGoodQuery } from '../../reducers/goodsApi'

const ViewGood = () => {
    const { id } = useParams()

    console.log(parseInt(id))

    const { goodId, name, price } = useGetGoodQuery(parseInt(id), {
        skip: !parseInt(id),
        selectFromResult: ({ data }) => ({
            goodId: data?.id,
            name: data?.name,
            price: data?.price,
        }),
    })

    return (
        <>
            <p>Goods name: {goodId}</p>
            <p>Goods price: {name}</p>
            <p>Goods price: {price}</p>
        </>
    )
}

export default ViewGood
