import getUserGameRating from "./getUserGameRating";

const getUserRat = async (userId, gameId) => {
  const userRating = await getUserGameRating(userId, gameId);
  if (!userRating) return null
  return userRating
};

export default getEmojiRating