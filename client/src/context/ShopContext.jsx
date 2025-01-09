import React, { createContext, useState, useEffect } from "react";
import { fetchLatestProducts } from "../services/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [currency] = useState("đ");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if(!size){
      toast.error('Vui lòng chọn size giày!');
      return;

    }
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }
      else{
        cartData[itemId][size] = 1;
      }
    }
    else{
      cartData[itemId] = {};
      cartData[itemId][size] = 1;

    }
    setCartItems(cartData);
  }

 
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
  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
      for(const item in cartItems[items]){  
        try {
          if(cartItems[items][item] > 0){
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalCount;
  } 

  const updateQuantity = async (itemId, size, quantity) => {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0;
  
    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => product.id === parseInt(itemId)
      );
  
      if (!itemInfo) continue; 
  
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.discounted_price * cartItems[itemId][size];
          }
        } catch (error) {
          console.error("Error in getCartAmount:", error);
        }
      }
    }
    return totalAmount;
  };
  

  const value = {
    currency,
    products,
    loading,
    error,
    search, 
    setSearch,
    showSearch, 
    setShowSearch,
    cartItems,
    addToCart, 
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate

  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
