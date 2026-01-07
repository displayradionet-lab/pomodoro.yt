import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-8" id="explore-menu">
      <h1 className="text-cyan-950 text-3xl font-semibold text-center -mb-10 mt-10">
        Explora il nostro menu
      </h1>
      <p className="text-md text-xl mt-4 -mb-6 text-cyan-800 text-center">
        Scegli dai diversi menu i piatti tradizionali che ti gustano.
        <br />
        Ingredienti sempre freschi, sani e genuini per soddisfare il tuo palato.
      </p>

      <div
        className="flex gap-6 justify-between  items-center my-6
         scrollable-x-container cursor-pointer"
      >
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="w-40 h-40"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
            >
              <img
                className={
                  category === item.menu_name
                    ? 'border-3 border-orange-500 p-2 rounded-full'
                    : ''
                }
                src={item.menu_image}
                alt=""
              />
              <p className="text-center mt-6 text-[#747474] font-semibold">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
