import axios from "axios";


const getGameInUserCollection = async (id, gameData) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/vaults/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (
      response.data.owned &&
      (await response.data.owned.find((game) => game.id == gameData.id))
    )
      return "owned";
    if (
      response.data.favourites &&
      (await response.data.favourites.find((game) => game.id == gameData.id))
    )
      return "favourites";
    if (
      response.data.wantToPlay &&
      (await response.data.wantToPlay.find((game) => game.id == gameData.id))
    )
      return "wantToPlay";
    if (
      response.data.wantToBuy &&
      (await response.data.wantToBuy.find((game) => game.id == gameData.id))
    )
      return "wantToBuy";
    if (
      response.data.forTrade &&
      (await response.data.forTrade.find((game) => game.id == gameData.id))
    )
      return "forTrade";
    if (
      response.data.wishList &&
      (await response.data.wishList.find((game) => game.id == gameData.id))
    ) return "wishList";
    
      return true;
  };

  export default getGameInUserCollection