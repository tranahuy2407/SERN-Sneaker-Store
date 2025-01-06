import React from "react";
import banner from "../assets/banner.jpg"
const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border-gray-400">
      {/* Left side*/}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base ">
              SẢN PHẨM BÁN CHẠY
            </p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'> SẢN PHẨM MỚI NHẤT</h1>
          <div className="flex items-center gap-2">
                <p className='font-semibold text-sm md:text-base'>MUA SẮM NGAY</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#414141]'> </p>
          </div>
        </div>
      </div>
      {/* Right side*/}
      <img className="w-full sm:w-1/2" src={banner} alt=''/>
    </div>
  );
};

export default Hero;
