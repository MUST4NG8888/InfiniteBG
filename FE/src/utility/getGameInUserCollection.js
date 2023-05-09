import axios from "axios";


const getGameInUserCollection = async (id, gameId) => {
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
      (await response.data.owned.find((game) => game.id == gameId))
    )
      return "owned";
    if (
      response.data.favourites &&
      (await response.data.favourites.find((game) => game.id == gameId))
    )
      return "favourites";
    if (
      response.data.wantToPlay &&
      (await response.data.wantToPlay.find((game) => game.id == gameId))
    )
      return "wantToPlay";
    if (
      response.data.wantToBuy &&
      (await response.data.wantToBuy.find((game) => game.id == gameId))
    )
      return "wantToBuy";
    if (
      response.data.forTrade &&
      (await response.data.forTrade.find((game) => game.id == gameId))
    )
      return "forTrade";
    if (
      response.data.wishList &&
      (await response.data.wishList.find((game) => game.id == gameId))
    ) return "wishList";
    
      return true;
  };

  export default getGameInUserCollection