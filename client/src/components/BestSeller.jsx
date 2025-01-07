import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setBestSeller(products.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8 ">
        <Title text1={"SẢN PHẨM "} text2={"BÁN CHẠY"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Sản phẩm bán chạy của chúng tôi là những mẫu giày thể thao thiết kế
          năng động, đẳng cấp và cực kỳ thoải mái. Với chất liệu cao cấp và kiểu
          dáng thời trang, mỗi đôi giày đều mang lại sự tự tin và thoải mái tối
          đa cho người sử dụng. Được ưa chuộng nhờ sự kết hợp hoàn hảo giữa tính
          năng và phong cách, đây là lựa chọn lý tưởng cho mọi hoạt động thể
          thao và đời sống thường ngày.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSeller.map((item,index)=>(
                <ProductItem 
                    key={index}
                    slug={item.slug}
                    name={item.name}
                    images={item.images}
                    price={item.price}
                    discounted_price={item.discounted_price}
                />
            ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
