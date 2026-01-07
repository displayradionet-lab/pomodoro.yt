import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const res = await axios.post(
      `${url}/api/order/user-orders`,
      {},
      { headers: { token } }
    );
    setData(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="my-7 mx-7">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">I miei ordini</h2>
      <div className="flex flex-col gap-4">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-4 px-5 text-sm 
             border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-center md:justify-start">
                <img src={assets.parcel_icon} alt="" className="w-8 h-8" />
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 line-clamp-1">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + ' x ' + item.quantity;
                    } else {
                      return item.name + ' x ' + item.quantity + ', ';
                    }
                  })}
                </p>
              </div>
              <p className="font-semibold text-green-600">
                € {order.amount}.00
              </p>
              <p className="text-gray-600">Items: {order.items.length}</p>
              <div className="flex flex-col md:flex-row md:items-center -ml-10 gap-2">
                <p className="flex items-center gap-1 mr-10">
                  <span className="text-green-500 mr-1">&#x25cf;</span>
                  <b className="text-gray-800 text-sm">{order.status}</b>
                </p>
                <button
                  onClick={fetchOrders}
                  className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded-md 
                transition duration-200 text-xs"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
