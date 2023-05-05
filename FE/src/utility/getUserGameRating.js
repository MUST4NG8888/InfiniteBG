import axios from "axios";


const getUserGameRating = async (userId, gameId) => {
    const response = await axios.get(
      `http://localhost:8080/api/ratings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return Math.round(response.data.filter(rating => rating.gameId === gameId)[0].rating)
  };

  export default getUserGameRating