import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LastestCollection = () => {
    const {products} = useContext(ShopContext);
    const {lastestProduct, setLastestProduct} = useState([]);

    useEffect(()=>{
        setLastestProduct(products.slice(0,10));
    },[])
  return (
    <div className='my-10 ' >
        <div className='text-center py-8 text-3xl '>
            <Title text1={'BỘ SƯU TẬP '} text2={'MỚI NHẤT'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-600'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, non odio. Aspernatur odit facere officiis asperiores architecto saepe 
            non distinctio molestiae perferendis optio consequatur, autem, iste voluptas explicabo eum sapiente?
            </p>
        </div>
        {/* Render model */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
             {
                lastestProduct.map((item,index)=>(
                    <ProductItem key={index} id={item.id} name={item.name} images={item.images} discounted_price={item.discounted_price} />
                ))
             }
        </div>
    </div>
  )
}

export default LastestCollection