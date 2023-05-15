import styles from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  return (
    <div id={styles.box}>
      <div id={styles.userBox}
      >
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
          src={review.ratedBy.avatar}
          alt=""
        />
        <h4>{review.ratedBy.username}</h4>
      <h1>{review.rating}</h1>
      </div>
      <div id={styles.descirptionBox}>
      <h4 style={{ color: "white" }}>{review.review}</h4>
      </div>
    </div>
  );
};

export default ReviewCard;
