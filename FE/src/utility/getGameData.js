import axios from "axios";


const getGameData = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`
    );
    
    console.log(response.data)
    return {...response.data[0]};
  };

export default getGameData