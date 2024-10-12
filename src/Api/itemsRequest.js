import axios from "axios"; 
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const url = "http://localhost:8000/items";

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