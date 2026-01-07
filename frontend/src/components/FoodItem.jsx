import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div>
      <div className="relative">
        <img
          src={image && image.startsWith('http') ? image : `${url}${image}`}
          alt={name}
          className="rounded-[15px] w-70 h-70 fade-in"
        />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            onClick={() => addToCart(id)}
            className="absolute w-8.75 -mt-12 ml-60 cursor-pointer rounded"
          />
        ) : (
          <div className="absolute flex w-7.5 ml-44 -mt-12 items-center gap-2 rounded-md ">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(id)}
              className=""
            />
            <p className="text-center text-orange-700 bg-white px-2 rounded-md">
              {cartItems[id]}
            </p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="relative">
        <div className="">
          <p className="text-gray-700 font-semibold">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="">$ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
