import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LastestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lastestProduct, setLastestProduct] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLastestProduct(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BỘ SƯU TẬP "} text2={"MỚI NHẤT"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Bộ sưu tập giày mới nhất mang đến những mẫu giày thể thao thời thượng,
          phong cách và chất lượng cao, phù hợp cho mọi hoạt động. Với thiết kế
          hiện đại, sử dụng vật liệu bền bỉ và công nghệ tiên tiến, bộ sưu tập
          này không chỉ mang lại sự thoải mái mà còn làm nổi bật phong cách cá
          nhân của bạn.
        </p>
      </div>
      {/* Render model */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {lastestProduct.map((item, index) => (
          <ProductItem
            key={index}
            slug={item.slug}
            name={item.name}
            images={item.images}
            price={item.price}
            discounted_price={item.discounted_price}
          />
        ))}
      </div>
    </div>
  );
};

export default LastestCollection;
