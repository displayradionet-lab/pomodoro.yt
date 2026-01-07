import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-20 lg:w-56 bg-teal-100 border-r border-gray-200">
      <div className="flex flex-col">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center py-3 pl-3 gap-2 border-b border-gray-200 ${
              isActive
                ? 'bg-teal-500 text-white'
                : 'bg-transparent hover:bg-gray-100'
            }`
          }
        >
          <img className="w-6" src={assets.add_icon} alt="" />
          <p className="hidden lg:block">Aggiungi Prodotto</p>
        </NavLink>
        <NavLink
          to={'/list'}
          className={({ isActive }) =>
            `flex items-center py-3 pl-3 gap-2 border-b border-gray-200 ${
              isActive
                ? 'bg-teal-500 text-white'
                : 'bg-transparent hover:bg-gray-100'
            }`
          }
        >
          <img className="w-6" src={assets.order_icon} alt="" />
          <p className="hidden lg:block">Lista Prodotti</p>
        </NavLink>
        <NavLink
          to={'/orders'}
          className={({ isActive }) =>
            `flex items-center py-3 pl-3 gap-2 border-b border-gray-200 ${
              isActive
                ? 'bg-teal-500 text-white'
                : 'bg-transparent hover:bg-gray-100'
            }`
          }
        >
          <img className="w-6" src={assets.order_icon} alt="" />
          <p className="hidden lg:block">Ordini</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
