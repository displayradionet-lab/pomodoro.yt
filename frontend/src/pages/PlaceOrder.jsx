import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

    const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: "",
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let res = await axios.post(url+"/api/order/place", orderData, {headers: {token}});
    if (res.data.success) {
      const {session_url} = res.data;
      window.location.replace(session_url);
    } else {
      alert('error')
    }
  };

  useEffect(()=> {
    if (!token) {
      navigate('/cart')
    }
     else if(getTotalCartAmount()===0)
      {
      navigate('/cart')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  return (
    <form
      onSubmit={placeOrder}
      className="flex flex-col lg:flex-row w-full items-start justify-between 
    gap-8 mt-5 px-5 max-w-7xl mx-auto"
    >
      {/* order-left */}
      <div className="flex-1 max-w-2xl">
        <p className="text-2xl font-semibold mb-6 text-gray-800">
          Info Spedizione
        </p>

        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="Nome"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
          <input
            type="text"
            placeholder="Cognome"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
        </div>

        <div className="mb-1 flex gap-3">
          <input
            type="text"
            placeholder=" Email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
          <input
            type="text"
            placeholder="Indirizzo"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
        </div>

        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="Città"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
          <input
            type="text"
            placeholder="Regione"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
        </div>
        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="C.A.P"
            name="zip"
            onChange={onChangeHandler}
            value={data.zip}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
          <input
            type="text"
            placeholder="Telefono"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            required
            className="border border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
        </div>
        <div className="mb-4 w-full flex gap-3">         
          <input
            type="text"
            placeholder="Stato"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
            className="border w-120 text-center border-violet-300 bg-violet-200 mr-3 py-2 px-2 rounded-md outline-violet-300"
          />
        </div>
      </div>

      {/* order-right */}
      <div className="flex-1 max-w-md">
        <div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-md 
        sticky top-4"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Riepilogo Ordine
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <p className="text-gray-600">Sub Totale</p>
              <p className="font-semibold">€ {getTotalCartAmount()}</p>
            </div>
            <div className="">
              <p className="text-gray-600">Spedizione</p>
              <p className="font-semibold">
                € {getTotalCartAmount() === 0 ? 0 : 2}
              </p>
            </div>
            <div className="">
              <b className="text-gray-600">Totale </b>
              <b className="font-semibold">
                € {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-violet-400 hover:bg-violet-500 text-white py-3 px-6 rounded-lg font-medium transition duration-200 shadow-sm"
          >
            Procedi al pagamento
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
