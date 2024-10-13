import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './items.css';
import { getItemsByGodownId, addQuantity, addItem, removeQuantity, deleteItem } from '../../Api/itemsRequest.js';

const DraggableItem = ({ item, index, refreshItems }) => {
  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: item,
  }));

  const handleDelete = async (id) => {
    await deleteItem(id);
    refreshItems();
  };

  const handleAddQuantity = async (id) => {
    const quantity = prompt('Enter the quantity to add:');
    if (quantity) {
      await addQuantity(id,quantity);
      refreshItems();
    }
  };

  const handleRemoveQuantity = async (id) => {
    const quantity = prompt('Enter the quantity to remove:');
    if (quantity) {
      await removeQuantity(id, quantity);
      refreshItems();
    }
  };

  return (
    <ContextMenuTrigger id={`item_${item._id}`}>
      <li ref={drag} className="item">
        <div>{index + 1}</div>
        <div>{item.name}</div>
        <div>{item.brand}</div>
        <div>{item.quantity}</div>
      </li>
      <ContextMenu id={`item_${item._id}`} className="context-menu">
        <MenuItem onClick={() => console.log('View Item')} className="context-menu-item">View Item</MenuItem>
        <MenuItem onClick={() => console.log('Edit Item')} className="context-menu-item">Edit Item</MenuItem>
        <MenuItem onClick={() => handleAddQuantity(item._id)} className="context-menu-item">Add Quantity</MenuItem>
        <MenuItem onClick={() => handleRemoveQuantity(item._id)} className="context-menu-item">Remove Quantity</MenuItem>
        <MenuItem onClick={() => handleDelete(item._id)} className="context-menu-item">Delete</MenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
};

const ItemComponent = ({ godown_id , name }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    fetchItems();
  }, [godown_id]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="item-component">
      <div className="item-component-header">
        <h2 className='text-2xl font-bold text-gray-800'>{godown_id ? `Godown: ${name}` : 'Select Godown to see items'}</h2>
        <div className="item-component-actions">
          <button onClick={() => console.log('Add Item')} className="item-component-button text-5xl text-center">+</button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
      <div className="item-grid-header">
        <div>Sl No.</div>
        <div>Name</div>
        <div>Brand</div>
        <div>Quantity</div>
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <ul>
          {filteredItems.map((item, index) => (
            <DraggableItem key={item._id} item={item} index={index} refreshItems={fetchItems} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemComponent;
