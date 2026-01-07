import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { food_list as defaultFoodList } from '../assets/assets';

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // API base URL: prefer VITE_API_URL in dev, fallback to localhost:5000
  const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const url = rawUrl.replace(/\/$/, '');

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + '/api/cart/add',
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { itemId },
        { headers: { token } }
      );
    }
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      url + '/api/cart/get',
      {},
      { headers: { token } }
    );
    setCartItems(res.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + '/api/food/list');
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setFoodList(res.data.data);
      } else {
        console.warn('API food list not available, falling back to local data');
        setFoodList(defaultFoodList);
      }
    } catch (error) {
      console.error('Failed to fetch food list:', error.message || error);
      setFoodList(defaultFoodList);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
