import React, { useState } from 'react';
import { addItem } from '../../Api/itemsRequest.js'; // Import the API functions
import './addItemForm.css'; // Import CSS for styling
import { toast } from 'react-hot-toast'; // Import toast for notifications

const AddItemForm = ({ godownId, onClose }) => {  // Taking godownId and onClose as props
  const [itemData, setItemData] = useState({
    name: '',
    quantity: 0,
    category: '',
    price: 0,
    brand: '',
    attributes: {
      type: '',
      material: '',
      warranty_years: ''
    },
    image_url: ''
  });

  const [loading, setLoading] = useState(false); // State for loader

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, attributes: { ...itemData.attributes, [name]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('itemData', itemData);
    console.log('godownId', godownId);

    if (!godownId) {
      toast.error('Select Godown to add item');
      setLoading(false);
      return;
    }

    const newItemData = {
      ...itemData,
      godown_id: godownId
    };

    await addItem(newItemData);
    setLoading(false);
    onClose(); // Close the form after successful submission
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
          <div className="attribute-group">
            <input type="text" name="type" placeholder="Type" value={itemData.attributes.type} onChange={handleAttributeChange} required />
            <input type="text" name="material" placeholder="Material" value={itemData.attributes.material} onChange={handleAttributeChange} required />
            <input type="text" name="warranty_years" placeholder="Warranty Years" value={itemData.attributes.warranty_years} onChange={handleAttributeChange} required />
          </div>
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
};

export default AddItemForm;
