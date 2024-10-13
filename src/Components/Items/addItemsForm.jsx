import React, { useState } from 'react';
import { addItem } from '../../Api/itemsRequest.js'; // Import the API functions
import './addItemForm.css'; // Import CSS for styling
import { toast } from 'react-hot-toast'; // Import toast for notifications

const AddItemForm = ({ godownId, onClose }) => {  // Taking godownId and onClose as props
  const [itemData, setItemData] = useState({
    name: '',
    quantity: 1,
    category: '',
    price: 1,
    brand: '',
    attributes: [], // Dynamic attributes as an array for key-value pair input
    image_url: ''
  });

  const [loading, setLoading] = useState(false); // State for loader

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...itemData.attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [key]: value };
    setItemData({ ...itemData, attributes: updatedAttributes });
  };

  const addAttribute = () => {
    setItemData({ ...itemData, attributes: [...itemData.attributes, { key: '', value: '' }] });
  };

  const removeAttribute = (index) => {
    const updatedAttributes = [...itemData.attributes];
    updatedAttributes.splice(index, 1);
    setItemData({ ...itemData, attributes: updatedAttributes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!godownId) {
      toast.error('Select Godown to add item');
      setLoading(false);
      return;
    }

    // Check if at least one attribute is provided
    const hasValidAttribute = itemData.attributes.some(attr => attr.key && attr.value);
    if (!hasValidAttribute) {
      toast.error('At least one attribute must be provided with both key and value.');
      setLoading(false);
      return;
    }

    // Transform the attributes array into an object
    const attributesObject = itemData.attributes.reduce((acc, attr) => {
      if (attr.key) acc[attr.key] = attr.value; // Only add if a key is provided
      return acc;
    }, {});

    const newItemData = {
      ...itemData,
      godown_id: godownId,
      attributes: attributesObject // Pass the object, not the array
    };
    console.log(newItemData);
    try {
      await addItem(newItemData);
      toast.success('Item added successfully');
      onClose(); // Close the form after successful submission
    } catch (error) {
      toast.error('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-page">
      <button onClick={onClose} className="back-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
      <form onSubmit={handleSubmit} className="add-item-form">
        {loading && <div className="loader">Loading...</div>}
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={itemData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={itemData.quantity} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={itemData.category} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={itemData.price} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input type="text" name="brand" value={itemData.brand} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image_url" value={itemData.image_url} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Attributes</label>
          {itemData.attributes.map((attr, index) => (
            <div key={index} className="attribute-group">
              <input
                type="text"
                placeholder="Key"
                value={attr.key}
                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Value"
                value={attr.value}
                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeAttribute(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addAttribute}>Add Attribute</button>
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
};

export default AddItemForm;
