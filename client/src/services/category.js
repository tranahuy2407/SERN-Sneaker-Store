import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;


/**
 * Fetch all active products from the backend.
 * @returns {Promise<Array>}
 */
export const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/admin/categories`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
      throw new Error("Lỗi khi fetch dữ liệu.");
    }
  };