import axios from "axios";


const getGameData = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`
    );
    return {...response.data[0]};
  };

export default getGameData