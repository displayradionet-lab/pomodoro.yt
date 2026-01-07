import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('error');
    }
  };

  const removeFood = async (foodId) => {
    const res = await axios.post(`${url}/api/food/remove`, { id: foodId});
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error('error')
    }
  }

  useEffect(() => {
    fetchList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col py-3 mx-5 items-center w-[90%] bg-teal-200">
      <p className="text-2xl mb-4 font-semibold">Lista Prodotti</p>
      <div className="flex flex-col gap-2">
        <div
          className="hidden md:grid grid-cols-5 bg-teal-500 border
      items-center gap-30 py-1 px-2 text-sm"
        >
          <b>Immagine</b>
          <b>Nome</b>
          <b>Categoria</b>
          <b>Prezzo</b>
          <b>Azione</b>
        </div>
        {list.map((item, idx) => {
          return (
            <div
              className="grid gap-30 grid-cols-1 lg:grid-cols-5 items-center
          text-sm py-1 px-2 border"
              key={idx}
            >
              <img src={`${url}${item.image}`} alt="" 
              className='rounded-md w-16'/>
              <p className="mt-3">{item.name}</p>
              <p className="mt-3">{item.category}</p>
              <p className="mt-3">{item.price}</p>
              <p onClick={() => removeFood(item._id)} 
              className="text-right md:text-center text-lg mt-3 cursor-pointer">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
