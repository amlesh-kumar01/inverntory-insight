import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import './items.css';
import { getItemsByGodownId } from '../../Api/itemsRequest.js';

const DraggableItem = ({ item }) => {
  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: item, 
  }));

  return (
    <li ref={drag} className="item">
      {item.name}
    </li>
  );
};

const ItemComponent = ({ godown_id }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      if (!godown_id) {
        setItems([]);
        setLoading(false);
        return;
      }
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
            <DraggableItem key={item._id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemComponent;
