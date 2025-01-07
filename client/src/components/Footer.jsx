import React from 'react'
import logo from '../assets/logo.jpg'
const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
            <div>
                <img src={logo} className="mb-5 w-32" alt=""/>
                <p className="w-full md:w-2/3 text-gray-600">
                Kết hợp phong cách hiện đại và chất lượng vượt trội. Sản phẩm bền bỉ, thoải mái và luôn thời trang, giúp bạn tự tin trong mọi bước đi."
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>CÔNG TY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Trang chủ</li>
                    <li>Về chúng tôi</li>
                    <li>Vận chuyển</li>
                    <li>Chính sách riêng tư</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>LIÊN HỆ</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+84-343-899-504</li>
                    <li>contact@shoesmaker.com</li>
                </ul>

            </div>
        </div>  
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ shoesmaker.com - All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer