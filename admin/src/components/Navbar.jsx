import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py- border-b bg-white">
      <Link to="/">
        <p className="flex flex-col text-red-500 italic  font-bold text-3xl">
          Pomodoro
          <span className="text-green-600 -mt-2">Ristorante</span>
        </p>
      </Link>

      <img src={assets.profile_icon} alt="" />
    </div>
  );
};

export default Navbar;
