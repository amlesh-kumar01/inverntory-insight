import axios from "axios"; // Corrected import syntax
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const url = "http://localhost:8000/godowns";

export const errorResponse = (error) => {
  if (error.response) {
    if (error.response.status === 404) {
      toast.error("Godowns not found.");
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

export const getGodowns = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${url}/getGodowns`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("Godowns:", response.data.godowns);
      return response.data.godowns;
    } else if (response.status === 404) {
      toast.error("No Godowns found.");
    }
  } catch (error) {
    console.error("Error fetching godowns:", error);
    errorResponse(error);
  }
};

export const getParentGodowns = async () => {
    try {
        const token = Cookies.get("token");
        const response = await axios.get(`${url}/getParentGodowns`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if (response.status === 200) {
        console.log("Locations:", response.data.godowns);
        return response.data.godowns;
        } else if (response.status === 404) {
        toast.error("No Locations found.");
        }
    } catch (error) {
        console.error("Error fetching parent godowns:", error);
        errorResponse(error);
    }
};

export const getGodownByParentId = async (parent_godown) => {
  try{
    const token = Cookies.get("token");
    const response = await axios.get(`${url}/getGodownByParentId/${parent_godown}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("Godowns:", response.data.godowns);
      return response.data.godowns;
    } else if (response.status === 404) {
      toast.error("No Godowns found.");
    }
  }catch
  (error) {
    console.error("Error fetching godowns:", error);
    errorResponse(error);
  }
}