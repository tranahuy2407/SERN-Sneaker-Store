import React from "react";
import exchange from "../assets/exchange.png";
import quality from "../assets/high-quality.png";
import support from "../assets/support.png";
const OurPolicy = () => {
    return (
        <div className="flex flex-row justify-around gap-12 sm:gap-6 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
          <div>
            <img src={exchange} className="w-12 m-auto mb-5" alt="" />
            <p className="font-semibold">Chính sách dễ dàng trao đổi</p>
            <p className="text-gray-400">
              Chính sách dễ dàng trao đổi sản phẩm.
            </p>
          </div>
          <div>
            <img src={quality} className="w-12 m-auto mb-5" alt="" />
            <p className="font-semibold">Chính sách 7 ngày trả hàng</p>
            <p className="text-gray-400">
              Đổi hàng 7 ngày không phí.
            </p>
          </div>
          <div>
            <img src={support} className="w-12 m-auto mb-5" alt="" />
            <p className="font-semibold">Dịch vụ hỗ trợ khách hàng tốt nhất</p>
            <p className="text-gray-400">
              Hỗ trợ bạn 24/7.
            </p>
          </div>
        </div>
      );      
};

export default OurPolicy;
