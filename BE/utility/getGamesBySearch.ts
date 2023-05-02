import { BggClient } from "boardgamegeekclient";

const bgg = BggClient.Create();

const getGamesBySearch = async <T>(search : T) => {
  const games = await bgg.search.query({
    query: `${search}`,
    type: ["boardgame", "boardgameexpansion"],
  });

  return games;
};

export default getGamesBySearch;
