import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type || !file.type.startsWith('image/')) {
      toast.error('Only image files are allowed.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Image too large. Max size is 10MB.');
      return;
    }
    setImage(file);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="w-[70%] mt-7 ml-15 text-gray-500 font-medium text-base">
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-teal-600">Carica Immagine</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="cursor-pointer w-30"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={handleImageChange}
            className="border border-gray-400 w-50 rounded-md p-1"
          />
        </div>
        <div className="my-2">
          <p className="text-teal-600">Nome del Prodotto</p>
          <input
            type="text"
            name="name"
            placeholder="Scrivi qui"
            onChange={onChangeHandler}
            value={data.name}
            className="p-1 border rounded-md w-70"
          />
        </div>
        <div className="mt-4">
          <p className="font-semibold text-teal-600">
            Descrizione del Prodotto
          </p>
          <textarea
            name="description"
            rows={'4'}
            placeholder="Scrivi qui il tuo commento"
            onChange={onChangeHandler}
            value={data.description}
            className="border border-gray-300 p-3"
          ></textarea>
        </div>

        <div className="mt-6 flex gap-7">
          <div>
            <p className="font-semibold text-teal-600">Categorie Prodotti</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls & Meat</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Desserts">Desserts</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="mb-5">
            <p className="font-bold text-teal-700">Prezzo</p>
            <input
              type="number"
              name="price"
              placeholder="€ 20"
              onChange={onChangeHandler}
              value={data.price}
              className="border border-gray-400 w-15 p-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white p-1 px-3 mb-7 rounded-md"
        >
          Aggiungi
        </button>
      </form>
    </div>
  );
};

export default Add;
