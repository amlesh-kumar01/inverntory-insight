import React from 'react';

const ItemModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative mt-20 md:mt-0">
        <button 
          className="absolute text-gray-600 hover:text-gray-900 text-3xl" 
          onClick={onClose} 
          style={{ top: '20px', right: '20px' }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
        <p className="mb-2"><strong>Brand:</strong> {item.brand}</p>
        <p className="mb-2"><strong>Quantity:</strong> {item.quantity}</p>
        <p className="mb-2"><strong>Category:</strong> {item.category}</p>
        <p className="mb-4"><strong>Price:</strong> {item.price}</p>
        <img src={item.image_url} alt={item.name} className="mb-4 w-32 h-32 rounded-lg  " />
        <div className="attributes">
          <h3 className="text-xl font-semibold mb-2">Attributes:</h3>
          {Object.entries(item.attributes).map(([key, value]) => (
            <p key={key} className="mb-1"><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
