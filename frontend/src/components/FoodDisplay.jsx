import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div id="food-display" className="mt-10 ml-8">
      <h2 className="text-xl font-semibold mb-10">Piatti Top vicno a te</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {food_list.map((item, idx) => {
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={idx}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
