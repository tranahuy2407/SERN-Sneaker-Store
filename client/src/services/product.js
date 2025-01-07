import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

/**
 * Fetch all active products from the backend.
 * @returns {Promise<Array>}
 */
export const fetchLatestProducts = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/all-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
