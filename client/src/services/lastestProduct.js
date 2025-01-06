import axios from "axios";

const API_URL = "http://localhost:5000";

/**
 * Fetch all active products from the backend.
 * @returns {Promise<Array>}
 */

export const fetchLatestProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/all-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
