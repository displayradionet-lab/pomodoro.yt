import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from "react-toastify"
import {assets} from "../assets/assets"

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const res = await axios.get( url + "/api/order/list");
    if( res.data.success ) {
      setOrders(res.data.data)
      console.log(res.data.data)
    } else {
      toast.error("error")
    }
  }

    const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: event.target.value
    })
    if(response.data.success)
      await fetchAllOrders();
  }

  useEffect(() => {
    fetchAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-[90%] bg-gray-100'>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 ml-5">
        Ordini
      </h3>
      <div className="flex flex-col gap-4">
        {orders.map((order, idx) => (
          <div key={idx} className='flex justify-center md:justify-start'>
            <img className='w-20 h-20' src={assets.parcel_icon} alt="" />
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-4 px-5 text-sm 
             border border-gray-200 rounded-lg shadow-sm bg-white md:col-span-2">
              <p className="mb-5 text-sm text-gray-600">
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>

              <p className="font-semibold ml-10">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>

                  <div>
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', '
                    }
                </p>
              </div>

                 <p className="flex gap-2">
                <img className="w-5" src={assets.phone_icon} alt="" />
                {order.address.phone}
              </p>

                <p className="text-xl">Items: {order.items.length}</p>
              <p className="text-green-500 text-xl">$ {order.amount}</p>

                <select onChange={() => statusHandler(event, order._id)} value={order.status}
              className="border -mt-5 rounded bg-white text-gray-600 outline-none">
                <option value="In preparazione">In Preparazione</option>
                <option value="In spedizione">In Spedizione</option>
                <option value="pagato">Pagato</option>
              </select>

             </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders