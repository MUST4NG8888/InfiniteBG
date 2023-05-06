import styles from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  return (
    <div id={styles.box}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          src={review.ratedBy.avatar}
          alt=""
        />
        <h4>{review.ratedBy.username}</h4>
      </div>
      <h4 style={{ color: "white" }}>{review.review}</h4>{" "}
    </div>
  );
};

export default ReviewCard;
