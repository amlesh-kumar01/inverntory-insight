import React, { useState, useEffect } from 'react';
import './items.css';
import { getItemsByGodownId } from '../../Api/itemsRequest.js';

const Item = ({ godown_id }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const itemsData = await getItemsByGodownId(godown_id);
      setItems(itemsData || []);
      setLoading(false);
    };
    fetchItems();
  }, [godown_id]);

  return (
    <div className="item-component">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Item;

