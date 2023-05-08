import axios from "axios";

const getUserGameLogs = async (id, gameId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/plays/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
      return response.data.plays.filter((play) => play.gameId === gameId)
  };

  export default getUserGameLogs