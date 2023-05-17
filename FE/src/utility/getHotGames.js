import axios from "axios";

const getHotGames = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/games/hot`
  );
  return response.data;
};

export default getHotGames;
