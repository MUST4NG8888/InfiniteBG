import { BggClient } from "boardgamegeekclient";
import { BggThreadDto } from "boardgamegeekclient/dist/esm/dto";

const bgg = BggClient.Create();

const getGames = async (id: number[] | number | undefined ) => {
  if (!id) return
  const games = await bgg.thing.query({
    id: id,
    videos: 1,
    stats: 1,
    type: ["boardgame", "boardgameexpansion"],
  });

  return games;
};

export default getGames;
 