import getEmojiRating from "./getEmojiRating";
import getGameData from "./getGameData";
import getGameInUserCollection from "./getGameInUserCollection";
import getGameReviews from "./getGameReviews";
import getUserGameLogs from "./getUserGameLogs";

const gamePageLoader = async (userId, gameId) => {
 return (
    Promise.all([
      await getGameData(gameId),
      await getUserGameLogs(userId, gameId),
      await getGameInUserCollection(userId, gameId),
      await getEmojiRating(userId, gameId),
      await getGameReviews(gameId),
    ])
  );
};

export default gamePageLoader;
