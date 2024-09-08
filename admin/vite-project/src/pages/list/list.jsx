import React, { useState, useEffect } from 'react';
import './list.css';
import axios from 'axios';

function List() {
  const [slist, setList] = useState([]);

  const fetch_list = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/api/food/AllFoodList');
      console.log(resp.data);

      if (resp.data.success) {
        setList(resp.data.message);
      } else {
        console.log('Error fetching data');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const del_food = async (item_id) => {
    try {
      const food_removal = await axios.post('http://localhost:5000/api/food/RemoveFood', { id: item_id });
      if (food_removal.data.success) {
        window.alert('Food Removed!');
        await fetch_list();
      } else {
        window.alert('Couldnt Remove, Error Occurred');
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  useEffect(() => {
    fetch_list();
  }, []);

  useEffect(() => {
    console.log('Updated slist:', slist);
  }, [slist]);

  return (
    <div className="list-container">
      <div className="list">
        {Array.isArray(slist) ? (
          slist.map((item, index) => (
            <div key={index}>
              <img src={`http://localhost:5000/images/${item.image}`} className='img-div' height={20} alt="" />
              <h1>Name: {item.name}</h1>
              <h1>Price: {item.price}</h1>
              <h1>Category: {item.category}</h1>
              <button onClick={() => del_food(item._id)}>Delete This Item</button>
              <br />
              <hr />
            </div>
          ))
        ) : (
          <p>No Items</p>
        )}
      </div>
    </div>
  );
}

export default List;
