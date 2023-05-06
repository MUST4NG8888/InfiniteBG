import axios from "axios";


const getUserGameRating = async (userId, gameId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/ratings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return Math.round(response.data.filter(rating => rating.gameId === gameId)[0].rating)
  };

  export default getUserGameRating