import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { fetchCategories } from "../services/category";
import { fetchBrands } from "../services/brand";
import next from "../assets/right-arrow.png";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filtercategories, setFilterCategories] = useState([]);
  const [filterbrands, setFilterBrands] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (filtercategories.includes(e.target.value)) {
      setFilterCategories((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setFilterCategories((prev) => [...prev, e.target.value]);
    }
  };
  const toggleBrand = (e) => {
    if (filterbrands.includes(e.target.value)) {
      setFilterBrands((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setFilterBrands((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filtercategories.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        filtercategories.includes(item.category.name)
      );
    }
    if (filterbrands.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        filterbrands.includes(item.brand.name)
      );
    }
    setFilterProducts(productsCopy);
  };
  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(
          fpCopy.sort((a, b) => a.discounted_price - b.discounted_price)
        );
        break;
      case "high-low":
        setFilterProducts(
          fpCopy.sort((a, b) => b.discounted_price - a.discounted_price)
        );
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch danh mục:", error);
      }
    };
    const getBrands = async () => {
      try {
        const response = await fetchBrands();
        if (response.success && Array.isArray(response.data)) {
          setBrands(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch thương hiệu:", error);
      }
    };
    getCategories();
    getBrands();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filtercategories, filterbrands, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t">
      {/* Lọc */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer"
        >
          LỌC
          <img
            src={next}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Lọc Danh mục */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Danh mục</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.length > 0 ? (
              categories.map((category) => (
                <p key={category.id} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={category.name}
                    onChange={toggleCategory}
                  />
                  {category.name}
                </p>
              ))
            ) : (
              <p>Không có danh mục nào</p>
            )}
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Thương hiệu</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {brands.length > 0 ? (
              brands.map((brand) => (
                <p key={brand.id} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={brand.name}
                    onChange={toggleBrand}
                  />
                  {brand.name}
                </p>
              ))
            ) : (
              <p>Không có thương hiệu nào</p>
            )}
          </div>
        </div>
      </div>
      {/*Bên phải */}
      <div className="flex-1  ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"TẤT CẢ "} text2={"SẢN PHẨM"} />
          {/* San pham */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 "
          >
            <option value="relavent">Sắp xếp theo: Liên quan</option>
            <option value="low-high">Sắp xếp theo: Thấp đến cao</option>
            <option value="high-low">Sắp xếp theo: Cao đến thấp</option>
          </select>
        </div>
        {/* fecth Sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
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
    </div>
  );
};

export default Collection;
