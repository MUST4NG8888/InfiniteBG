import styles from "./ReviewCard.module.css";
import EmojiRatingSmall from "./EmojiRatingSmall";

const ReviewCard = ({ review }) => {

  let rating = 0;
  if (review.rating > 0) rating = 1;
  if (review.rating > 2.5) rating = 2;
  if (review.rating > 5.0) rating = 3;
  if (review.rating > 7.5) rating = 4;

  return (
    <div id={styles.box}>
      <div id={styles.userBox}>
        <img
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={review.ratedBy.avatar}
          alt=""
        />
        <h4>{review.ratedBy.username}</h4>
        <div id={styles.ratingBox}>
          <h1
            className={
              (rating === 1 && styles.red) ||
              (rating === 2 && styles.yellow) ||
              (rating === 3 && styles.green) ||
              (rating === 4 && styles.blue)
            }
          >
            {review.rating}
          </h1>
          <EmojiRatingSmall userRating={review.rating} />
        </div>
      </div>
      <div id={styles.descirptionBox}>
        <h4 style={{ color: "white" }}>{review.review}</h4>
      </div>
    </div>
  );
};

export default ReviewCard;
