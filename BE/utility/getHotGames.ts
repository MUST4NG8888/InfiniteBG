import { BggClient } from "boardgamegeekclient";

const bgg = BggClient.Create();



const getHotGames = async () => {
  const hotGames = await bgg.hot.query({});

  const hotID = hotGames.map((game) => game.id);

  const data = await bgg.thing.query({
    id: hotID, 
    stats: 1,
    type: "boardgame",
  });


  return data;
};

export default getHotGames;
