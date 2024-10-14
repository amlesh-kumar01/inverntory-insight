import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
// import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import "./items.css";
import {
  getItemsByGodownId,
  addQuantity,
  removeQuantity,
  deleteItem,
} from "../../Api/itemsRequest.js";
import AddItemForm from "./addItemsForm.jsx";
import ItemModal from "../../utils/modals/viewItem.js";
import { Menu, MenuItem } from "@mui/material";

const DraggableItem = ({ item, index, refreshItems }) => {
  const [, drag] = useDrag(() => ({
    type: "ITEM",
    item: item,
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    handleClose();
    await deleteItem(id);
    refreshItems();
  };

  const handleAddQuantity = async (id) => {
    const quantity = prompt("Enter the quantity to add:");
    if (quantity) {
      handleClose();
      await addQuantity(id, quantity);
      refreshItems();
    }
  };

  const handleRemoveQuantity = async (id) => {
    const quantity = prompt("Enter the quantity to remove:");
    if (quantity) {
      handleClose();
      await removeQuantity(id, quantity);
      refreshItems();
    }
  };

  const handleViewItem = () => {
    handleClose();
    setIsModalOpen(true);
  };

  return (
    <>
      <li
        ref={drag}
        onContextMenu={handleContextMenu}
        onTouchStart={handleContextMenu} // For mobile devices
        className="item"
        style={{ cursor: "context-menu" }} // Optional for context menu indication
      >
        <div>{index + 1}</div>
        <div>{item.name}</div>
        <div>{item.brand}</div>
        <div>{item.quantity}</div>
      </li>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: "bg-white shadow-lg rounded-lg" }} // Custom styling
      >
        <MenuItem onClick={handleViewItem}>View Item</MenuItem>
        <MenuItem onClick={() => console.log("Edit Item")}>Edit Item</MenuItem>
        <MenuItem onClick={() => handleAddQuantity(item._id)}>
          Add Quantity
        </MenuItem>
        <MenuItem onClick={() => handleRemoveQuantity(item._id)}>
          Remove Quantity
        </MenuItem>
        <MenuItem onClick={() => handleDelete(item._id)}>Delete</MenuItem>
      </Menu>

      {isModalOpen && (
        <ItemModal item={item} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

const ItemComponent = ({ godown_id, name }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddItemForm, setShowAddItemForm] = useState(false); // State for showing AddItemForm

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

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormClose = () => {
    setShowAddItemForm(false);
    fetchItems(); // Refresh item list after closing form
  };

  return (
    <div className="item-component">
      {showAddItemForm ? (
        <AddItemForm godownId={godown_id} onClose={handleFormClose} />
      ) : (
        <>
          <div className="item-component-header">
            <h2 className="   font-bold text-[#2866cb]">
              {godown_id ? `Godown: ${name}` : "Select Godown to see items"}
            </h2>
            <div className="item-component-actions">
              <button
                onClick={() => setShowAddItemForm(true)}
                className="item-component-button text-4xl text-center p-2"
                title="Add Item" // This will show "Add Item" text on hover
              >
                +
              </button>
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
                <DraggableItem
                  key={item._id}
                  item={item}
                  index={index}
                  refreshItems={fetchItems}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ItemComponent;
