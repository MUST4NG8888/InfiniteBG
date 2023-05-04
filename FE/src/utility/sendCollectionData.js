import axios from "axios";


const sendCollectionData = async (x, y) => {

    console.log(x)
if ( x === "none") {

    const response = await axios.delete(
        `http://localhost:8080/api/vaults/${y}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data)

      return response.data
    };


  const response = await axios.post(
    "http://localhost:8080/api/vaults",
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

  return response.data
};


export default sendCollectionData