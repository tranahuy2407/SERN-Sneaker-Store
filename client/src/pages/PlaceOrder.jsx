import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartToTal from '../components/CartToTal'
import zalopay from '../assets/zalopay.jpg'
import vnpay from '../assets/vnpay.png'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext)
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
              <Title text1={'THÔNG TIN '} text2={'VẬN CHUYỂN'}/>
        </div>
        <div className="flex gap-3 ">
            <input type="text" placeholder="Họ người nhận" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
            <input type="text" placeholder="Tên người nhận" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
        </div>
        <input type="email" placeholder="Email người nhận" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
        <input type="text" placeholder="Địa chỉ cụ thể" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
        <div className="flex gap-3 ">
            <input type="text" placeholder="Xã/Phường" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
            <input type="text" placeholder="Quận/Huyện" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
        </div>
        <div className="flex gap-3 ">
            <input type="text" placeholder="Tỉnh/Thành" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
            <input type="text" placeholder="Mã giảm" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
        </div>
        <input type="text" placeholder="Số điện thoại" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
      </div>
      <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartToTal/>
          </div>
          <div className="mt-12">
            <Title text1={'PHƯƠNG THỨC'} text2={'THANH TOÁN'} />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={()=>setMethod('zalopay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'zalopay' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 mx-4' src={zalopay} alt='' />
              </div>
              <div onClick={()=>setMethod('vnpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'vnpay' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 mx-4' src={vnpay} alt='' />
              </div>
              <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>TIỀN MẶT</p>
              </div>
            </div>
            <div className='w-full text-end mt-8 '>
                <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>THANH TOÁN</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlaceOrder