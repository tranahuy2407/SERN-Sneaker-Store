import React, { createContext, useState, useEffect } from "react";
import { fetchLatestProducts } from "../services/product";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [currency] = useState("đ");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchLatestProducts();
        setProducts(productsData);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const value = {
    currency,
    products,
    loading,
    error,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
