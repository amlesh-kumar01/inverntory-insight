// AddGodownModal.js
import React, { useState } from 'react';

const AddGodownModal = ({ isOpen, onClose, onSubmit }) => {
  const [godown, setGodown] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl mb-4">Enter the godown</h2>
        <input
          type="text"
          value={godown}
          onChange={(e) => setGodown(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button
            onClick={() => { onSubmit(godown); onClose(); }}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGodownModal;
