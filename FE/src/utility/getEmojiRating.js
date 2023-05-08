import getUserGameRating from "./getUserGameRating";

const getEmojiRating = async (userId, gameId) => {
  const userRating = await getUserGameRating(userId, gameId);
  if (!userRating) return null
  if (userRating > 7.5) return 4;
  if (userRating > 5.0) return 3;
  if (userRating > 2.5) return 2;
  if (userRating > 0) return 1;
};

export default getEmojiRating