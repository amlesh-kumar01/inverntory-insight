import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './items.css';
import { getItemsByGodownId } from '../../Api/itemsRequest.js';

const DraggableItem = ({ item }) => {
  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: item,
  }));
  return (
    <ContextMenuTrigger id={`item_${item._id}`}>
      <li ref={drag} className="item">
        {item.name}
      </li>
      <ContextMenu id={`item_${item._id}`} className="context-menu">
        <MenuItem onClick={() => console.log('View Item')} className="context-menu-item">View Item</MenuItem>
        <MenuItem onClick={() => console.log('Edit Item')} className="context-menu-item">Edit Item</MenuItem>
        <MenuItem onClick={() => console.log('Add Quantity')} className="context-menu-item">Add Quantity</MenuItem>
        <MenuItem onClick={() => console.log('Remove Quantity')} className="context-menu-item">Remove Quantity</MenuItem>
        <MenuItem onClick={() => console.log('Delete Item')} className="context-menu-item">Delete</MenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
};

const ItemComponent = ({ godown_id , name}) => {
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
      <div className="item-component-header">
        <h2 className='text-2xl font-bold text-gray-800'>{godown_id ? `Godown: ${name}` : 'Select Godown to see items'}</h2>
        <div className="item-component-actions">
          <button onClick={() => console.log('Add Item')} className="item-component-button">Add Item</button>
          <button onClick={() => console.log('Search Item')} className="item-component-button">Search Item</button>
        </div>
      </div>
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
