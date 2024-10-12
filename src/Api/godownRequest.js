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

export const changeParentGodown = async (godownId, parentGodownId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${url}/changeParentGodown/${godownId}`, { parent_godown: parentGodownId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Godown parent updated successfully.");
      return response.data.godown;
    } else if (response.status === 400) {
      toast.error(response.data.message || "Parent Godown is required.");
    } else if (response.status === 404) {
      toast.error(response.data.message || "Godown not found.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error updating parent godown:", error);
    toast.error("Network error: No response received.");
  }
};

export const renameGodown = async (godownId, newName) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${url}/renameGodown/${godownId}`, { name: newName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Godown name updated successfully.");
      return response.data.godown;
    } else if (response.status === 400) {
      toast.error(response.data.message || "Name is required.");
    } else if (response.status === 404) {
      toast.error(response.data.message || "Godown not found.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error renaming godown:", error);
    toast.error("Network error: No response received.");
  }
};

export const deleteGodown = async (godownId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`${url}/deleteGodown/${godownId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Godown and its children deleted successfully.");
      return true;
    } else if (response.status === 404) {
      toast.error(response.data.message || "Godown not found.");
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error deleting godown:", error);
    toast.error("Network error: No response received.");
  }
};

export const addGodown = async (godownData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${url}/addGodown`, godownData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      toast.success("Godown added successfully.");
      return response.data.godown;
    } else if (response.status === 400) {
      if (response.data.message === "Name is required") {
        toast.error("Name is required.");
      } else if (response.data.message === "Invalid parent_godown UUID") {
        toast.error("Invalid parent godown ID.");
      } else if (response.data.message === "Godown with the same name already exists") {
        toast.error("A godown with this name already exists.");
      } else {
        toast.error(response.data.message || "Error adding godown.");
      }
    } else if (response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(response.data.message || `Unexpected error: ${response.status}`);
    }

  } catch (error) {
    console.error("Error adding godown:", error);
    toast.error("Network error: No response received.");
  }
};
