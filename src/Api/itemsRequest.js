import axios from "axios"; 
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const url = "https://tree-view-app-backend.onrender.com/items";

export const errorResponse = (error) => {
  if (error.response) {
    if (error.response.status === 404) {
      toast.error("Items not found.");
    } else if (error.response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(`Unexpected error: ${error.response.status}`);
    }
  } else if (error.request) {
    toast.error("Network error: No response received.");
  } else {
    toast.error("Error in setting up request.");
  }
};

export const getItemsByGodownId = async (godown_id) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${url}/getItemsByGodownId/${godown_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("Items:", response.data.items);
      return response.data.items;
    } else if (response.status === 404) {
      toast.error("No Items found.");
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    errorResponse(error);
  }
}

export const editItem = async (item_id, updateData)=>{
  try{
    const token = Cookies.get("token");
    const response = await axios.put(`${url}/editItem/${item_id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status === 200){
      toast.success("Item updated successfully.");
      return response.data.item;
    } else if (response.status === 404) {
      toast.error("Item not found.");
    }
  } catch (error) {
    console.error("Error editing item:", error);
    errorResponse(error);
  }
}

// Function to add a new item
export const addItem = async (itemData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${url}/addItem`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      toast.success("Item created successfully.");
      return response.data.item;
    } else if (response.status === 400) {
      toast.error(response.data.message || "Invalid data provided.");
    } else if (response.status === 404) {
      toast.error(response.data.message || "Item not found.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error creating item:", error);
    toast.error("Network error: No response received.");
  }
};

// Function to add quantity to an item
export const addQuantity = async (item_id, quantity) => {
  try {
    const token = Cookies.get("token");
    console.log("item_id", item_id);
    const response = await axios.put(`${url}/addQuantity/${item_id}`, { quantity: `${quantity}`}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Quantity added successfully.");
      return response.data.item;
    } else if (response.status === 400) {
      toast.error(response.data.message || "Invalid data provided.");
    } else if (response.status === 404) {
      toast.error(response.data.message || "Item not found.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error adding quantity:", error);
    toast.error("Network error: No response received.");
  }
};

// Function to remove quantity from an item
export const removeQuantity = async (item_id, quantity) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${url}/removeQuantity/${item_id}`, { quantity:quantity }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      if(!response.data.success){
        toast.error(response.data.message || "Insufficient quantity to remove.");
        return ;
      }
      toast.success("Quantity removed successfully.");
      return response.data.item;
    } else if (response.status === 400) {
      toast.error(response.data.message || "Invalid data provided.");
      return;
    } else if (response.status === 404) {
      toast.error(response.data.message || "Item not found.");
      return;
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
      return;
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
      return;
    }

  } catch (error) {
    console.error("Error removing quantity:", error);
    toast.error("Network error: No response received.");
  }
};

// Function to get all items by category
export const getItemsByCategory = async (category) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${url}/getItemsByCategory/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.items;
    } else if (response.status === 400) {
      toast.error(response.data.message || "Invalid category provided.");
    } else if (response.status === 404) {
      toast.error(response.data.message || "No items found for the given category.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error fetching items by category:", error);
    toast.error("Network error: No response received.");
  }
};

export const deleteItem = async (item_id) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`${url}/deleteItem/${item_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Item deleted successfully.");
      return response.data.item;
    } else if (response.status === 404|| response.status===400) {
      toast.error(response.data.message || "Item not found.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error deleting item:", error);
    toast.error("Network error: No response received.");
  }
}

export const searchItems = async (searchQuery) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${url}/searchItems/${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Items fetched successfully.");
      return response.data.items;
    } else if (response.status === 404) {
      toast.error(response.data.message || "No items found for the given search query.");
      return;
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
      return;
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
      return;
    }

  } catch (error) {
    console.error("Error fetching items by search query:", error);
    toast.error("No Items Found.");
  }
}



