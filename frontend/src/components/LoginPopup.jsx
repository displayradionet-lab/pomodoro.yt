import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Accedi');
  console.log(currState);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === 'Iscriviti') {
      newUrl += '/api/user/register';
    } else {
      newUrl += '/api/user/login';
    }

    const res = await axios.post(newUrl, data);
    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setShowLogin(false);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-teal-900/80 p-4">
      <form
        onSubmit={onLogin}
        className="w-full max-w-sm bg-white text-teal-500 flex flex-col gap-5 p-6 
        md:p-10 rounded-lg relative"
      >
        <div className="flex justify-between items-center">
          <h2
            className="text-xl md:text-base
                 font-bold"
          >
            {currState}
          </h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
            className="cursor-pointer flex w-5 absolute right-5 -mt-6"
          />
        </div>
        <div className="flex flex-col gap-3 text-teal-500">
          {currState === 'Accedi' ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              placeholder="Il tuo nome"
              required
              onChange={onChangeHandler}
              value={data.name}
              className=" border-2 border-green-700 text-teal-700 rounded p-2"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="La tua Email"
            required
            onChange={onChangeHandler}
            value={data.email}
            className=" border-2 border-green-700 text-teal-700 rounded p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="La tua Password"
            required
            onChange={onChangeHandler}
            value={data.password}
            className=" border-2 border-green-500 text-teal-700 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 py-2 text-sm rounded-md text-white 
        hover:bg-teal-600 transition-colors"
        >
          {currState === 'Iscriviti' ? 'Iscriviti' : 'Accedi'}
        </button>
        <div className="">
          <input type="checkbox" required />
          <p className="text-xs">Accetto i termini e le condizioni</p>
        </div>
        {currState === 'Accedi' ? (
          <p className="text-xs flex flex-wrap gap-1">
            Crea nuovo account?{' '}
            <span
              className="cursor-pointer underline"
              onClick={() => setCurrState('Iscriviti')}
            >
              Clicca qui
            </span>
          </p>
        ) : (
          <p className="flex flex-wrap gap-1 text-xs">
            Hai gia' un nuovo account?
            <span
              className="cursor-pointer underline"
              onClick={() => setCurrState('Accedi')}
            >
              Accedi qui
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
