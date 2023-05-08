import axios from "axios";

const getGameReviews = async (id) => {
try {
  const response = await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/ratings/game/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }) 
    
    return response.data
  } catch (error) { return null}
  };

export default getGameReviews;
