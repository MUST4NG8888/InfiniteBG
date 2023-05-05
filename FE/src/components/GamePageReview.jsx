import styles from "./GamePageReview.module.css"
import ReviewCards from "./ReviewCards";
const GamePageReview = ({ reviews }) => {
  console.log(reviews);
  return (
    <div>
      <h1 id={styles.title}>Reviews</h1>
      <div>
        {reviews &&
          reviews.map((review, index) => (
            <ReviewCards key={index} review={review} />
          ))}
      </div>
    </div>
  );
};

export default GamePageReview;
