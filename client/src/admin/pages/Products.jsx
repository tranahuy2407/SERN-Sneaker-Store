import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { fetchCategories } from "../../services/category";
import { fetchBrands } from "../../services/brand";
import AddProduct from "../components/AddProduct";

function Products() {
  const { products, currency } = useContext(ShopContext);

  // State for filters
  const [filterName, setFilterName] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterBrands, setFilterBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // State for Add Product form
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  // Fetch categories and brands from the API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getBrands = async () => {
      try {
        const response = await fetchBrands();
        if (response.success && Array.isArray(response.data)) {
          setBrands(response.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    getCategories();
    getBrands();
  }, []);

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesCategory =
      filterCategories.length === 0 ||
      filterCategories.includes(product.category.name);
    const matchesBrand =
      filterBrands.length === 0 || filterBrands.includes(product.brand.name);

    return matchesName && matchesCategory && matchesBrand;
  });

  // Handle edit and delete actions
  const handleEdit = (id) => {
    console.log("Edit product ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete product ID:", id);
  };

  // Handle category and brand filter toggles
  const toggleCategory = (e) => {
    if (filterCategories.includes(e.target.value)) {
      setFilterCategories((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setFilterCategories((prev) => [...prev, e.target.value]);
    }
  };

  const toggleBrand = (e) => {
    if (filterBrands.includes(e.target.value)) {
      setFilterBrands((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setFilterBrands((prev) => [...prev, e.target.value]);
    }
  };

  // Handle Add Product form submission
  const handleAddProduct = (newProduct) => {
    console.log("Product added:", newProduct);
    setShowAddProductForm(false); // Close form after submission
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* Filter Section */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm"
          className="border p-2 rounded"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>

      {/* Filter Categories */}
      <div className="mb-4">
        <h3 className="font-semibold">Danh mục</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={category.name}
                onChange={toggleCategory}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* Filter Brands */}
      <div className="mb-4">
        <h3 className="font-semibold">Thương hiệu</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={brand.name}
                onChange={toggleBrand}
              />
              {brand.name}
            </label>
          ))}
        </div>
      </div>

      {/* Add Product Button */}
      <button
        onClick={() => setShowAddProductForm(true)}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        Thêm sản phẩm
      </button>

      {/* Add Product Form Modal */}
      {showAddProductForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal container with adjusted height */}
          <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-auto">
            <AddProduct
              categories={categories}
              brands={brands}
              onAddProduct={handleAddProduct}
              onCancel={() => setShowAddProductForm(false)}
            />
          </div>
        </div>
      )}

      {/* Product Table */}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Tên sản phẩm</th>
            <th className="py-2 px-4 text-left">Ảnh</th>
            <th className="py-2 px-4 text-left">Giá</th>
            <th className="py-2 px-4 text-left">Thương hiệu</th>
            <th className="py-2 px-4 text-left">Danh mục</th>
            <th className="py-2 px-4 text-left">Mô tả</th>
            <th className="py-2 px-4 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4">{product.id}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">
                <img
                  src={product.images} 
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4">
                {currency.symbol}
                {product.price}
              </td>
              <td className="py-2 px-4">{product.brand.name}</td>
              <td className="py-2 px-4">{product.category.name}</td>
              <td className="py-2 px-4">{product.description}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
