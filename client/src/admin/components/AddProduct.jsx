import React, { useState } from "react";

function AddProduct({ categories, brands, onAddProduct, onCancel }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    discounted_price: "",
    stock: "",
    category: "",
    brand: "",
    status: "active",
    image: null, // To store the selected image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({
        ...prev,
        image: file, // Set the selected file to state
      }));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    onAddProduct(newProduct); // Pass new product to parent
  };

  const renderImagePreview = () => {
    if (newProduct.image) {
      const imageUrl = URL.createObjectURL(newProduct.image);
      return <img src={imageUrl} alt="Product Preview" className="w-32 h-32 object-cover" />;
    }
    return <p>Chưa có ảnh</p>;
  };

  return (
    <form onSubmit={handleAddProduct} className="mb-4 border p-4 rounded">
  <h3 className="font-semibold mb-2">Thêm sản phẩm</h3>

  {/* Tên sản phẩm */}
  <div className="mb-2">
    <label className="block mb-1">Tên sản phẩm</label>
    <input
      type="text"
      name="name"
      className="border p-2 rounded w-full"
      value={newProduct.name}
      onChange={handleInputChange}
      required
    />
  </div>

  {/* Giá gốc và Giá giảm */}
  <div className="mb-2 flex gap-4">
    <div className="flex-1">
      <label className="block mb-1">Giá gốc</label>
      <input
        type="number"
        name="price"
        className="border p-2 rounded w-full"
        value={newProduct.price}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="flex-1">
      <label className="block mb-1">Giá giảm</label>
      <input
        type="number"
        name="discounted_price"
        className="border p-2 rounded w-full"
        value={newProduct.discounted_price}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>

  {/* Tồn kho */}
  <div className="mb-2">
    <label className="block mb-1">Tồn kho</label>
    <input
      type="number"
      name="stock"
      className="border p-2 rounded w-full"
      value={newProduct.stock}
      onChange={handleInputChange}
      required
    />
  </div>

  {/* Danh mục và Thương hiệu */}
  <div className="mb-2 flex gap-4">
    <div className="flex-1">
      <label className="block mb-1">Danh mục</label>
      <select
        name="category"
        className="border p-2 rounded w-full"
        value={newProduct.category}
        onChange={handleInputChange}
        required
      >
        <option value="">Chọn danh mục</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
    <div className="flex-1">
      <label className="block mb-1">Thương hiệu</label>
      <select
        name="brand"
        className="border p-2 rounded w-full"
        value={newProduct.brand}
        onChange={handleInputChange}
        required
      >
        <option value="">Chọn thương hiệu</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Trạng thái */}
  <div className="mb-2">
    <label className="block mb-1">Trạng thái</label>
    <select
      name="status"
      className="border p-2 rounded w-full"
      value={newProduct.status}
      onChange={handleInputChange}
      required
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  {/* Image Upload Section */}
  <div className="mb-2">
    <label className="block mb-1">Chọn ảnh sản phẩm</label>
    <input
      type="file"
      name="image"
      accept="image/*"
      className="border p-2 rounded w-full"
      onChange={handleFileChange}
    />
    <div className="mt-2">
      {renderImagePreview()} {/* Display image preview */}
    </div>
  </div>

  {/* Submit Buttons */}
  <div className="flex gap-2">
    <button type="submit" className="p-2 bg-blue-500 text-white rounded">
      Thêm sản phẩm
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="p-2 bg-red-500 text-white rounded"
    >
      Hủy
    </button>
  </div>
</form>

  );
}

export default AddProduct;
