import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartToTal = () => {
    const {currency, getCartAmount} = useContext(ShopContext); 
    console.log(getCartAmount)
  return (
    <div className="w-full ">
        <div className="text-2xl ">
            <Title text1={'TỔNG '} text2={'CỘNG'} />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Tổng cộng</p>
                <p>{getCartAmount()}.00 {currency}</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Phí vận chuyển: </p>
                <p>0 {currency}</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <b>Tổng cộng</b>
                <p>{getCartAmount() === 0 ? 0 : getCartAmount()} {currency}</p>
            </div>
        </div>
    </div>
  )
}

export default CartToTal