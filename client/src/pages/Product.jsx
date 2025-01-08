import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import star from "../assets/star.png";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { slug } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.slug === slug) {
        setProductData(item);
        setImage(item.images);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  const sizes = productData ? JSON.parse(productData.sizes) : [];

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img
              src={productData.images}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            />
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Product"></img>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {productData.discounted_price} {currency}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn size</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData.id, size)} className="bg-black text-white px-8 py-3 active:bg-gray-700">
            Thêm vào giỏ hàng
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Sản phẩm nguyên bản.</p>
            <p>Thanh toán bằng tiền mặt hoặc chuyển khoản.</p>
            <p>Dễ dàng đổi trả miễn phí cách 7 ngày từ ngày giao hàng.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm ">Mô tả</b>
          <p className="border px-5 py-3 text-sm">Đánh giá (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            possimus dolorem a obcaecati rem hic cumque quae aliquid quia. Minus
            perferendis temporibus voluptatem, possimus facere laborum illo
            numquam dolorum. Molestias.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non odio
            doloremque impedit ducimus ex quibusdam excepturi vel labore nam
            doloribus quas recusandae amet, mollitia atque optio explicabo
            eveniet praesentium! Quasi!
          </p>
        </div>
      </div>
      <RelatedProduct
        categories={productData.category.name}
        brands={productData.brand.name}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
