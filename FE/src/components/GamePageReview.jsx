import styles from "./GamePageReview.module.css"
import ReviewCard from "./ReviewCard";
const GamePageReview = ({ reviews }) => {
  return (
    <div id={styles.container}>
      <h1 id={styles.title}>Reviews</h1>
      <div>
        {reviews &&
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
      </div>
    </div>
  );
};

export default GamePageReview;
