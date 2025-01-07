import React from "react";

const NewletterBox = () => {
    const onSubmitHandler = () => {
        event.preventDefault();
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800 ">
        Đăng ký lần đầu nhận 20% giảm giá toàn sản phẩm
      </p>
      <p className="text-gray-400 mt-3 ">
        Đăng ký lần đầu và nhận ngay ưu đãi 20% giảm giá cho toàn bộ sản phẩm
        trong cửa hàng! Đừng bỏ lỡ cơ hội tuyệt vời này để mua sắm những sản
        phẩm yêu thích với mức giá cực kỳ ưu đãi. Chỉ cần đăng ký tài khoản lần
        đầu, bạn sẽ được áp dụng ngay mã giảm giá vào đơn hàng đầu tiên. Thỏa
        sức mua sắm và tận hưởng những ưu đãi hấp dẫn từ chúng tôi!
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input type="email" className="w-full sm:flex-1 outline-none" placeholder="Nhập email của bạn!"/>
        <button type="submit" className="bg-black text-white text-xs px-10 py-4">Đăng ký</button>
      </form>
    </div>
  );
};

export default NewletterBox;
