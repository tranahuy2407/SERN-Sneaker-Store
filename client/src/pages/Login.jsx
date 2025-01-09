import React, { useState } from 'react'

const Login = () => {
  const [currentState,setCurentState] = useState('Đăng Nhập');
  const onSubmitHander = async (event) => {
    event.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHander} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl ">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === 'Đăng Nhập' ? '' : <input type='text' className="w-full px-3 py-2 border border-gray-800" placeholder="Tên người dùng" /> }
        <input type='email' className="w-full px-3 py-2 border border-gray-800" placeholder="Email"/>
        <input type='password' className="w-full px-3 py-2 border border-gray-800" placeholder="Mật khẩu"/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'> 
            <p className='cursor-pointer'>Quên mật khẩu ?</p>
            {
              currentState === 'Đăng Nhập'
              ? <p onClick={()=>setCurentState('Đăng Ký')} className='cursor-pointer'>Tạo tài khoản ?</p>
              : <p onClick={()=>setCurentState('Đăng Nhập')} className='cursor-pointer'>Đăng nhập tại đây!</p>
            }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Đăng Nhập' ? 'Đăng Nhập' : 'Đăng Ký'}</button>
    </form>
  )
}

export default Login