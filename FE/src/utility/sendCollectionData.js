import axios from "axios";

const sendCollectionData = async (x, y) => {
  console.log(x);
  if (x === "none") {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/vaults/${y}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);

    return response.data;
  }

  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/vaults`,
    {
      collectionName: x,
      gameId: y,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export default sendCollectionData;
