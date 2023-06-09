import React, { useState } from "react";
import "../App.css";

const Footer = () => {
  const [review, setReview] = useState({
    product_id: 0,
    user_id: 0,
    rating: 0,
    comment: "",
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to submit the review
      const response = await fetch("http://127.0.0.1:8000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        // Review successfully submitted
        console.log("Your review has been posted!");
        setReview({
          product_id: 0,
          user_id: 0,
          rating: 0,
          comment: "",
        }); // Reset the review fields
      } else {
        // Error submitting the review
        console.error("Error submitting the review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the review. Please try again.");
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  return (
    <footer className="footer">
      <p className="footer__subscribe-text">
        NEW TO SOKOYETU? Subscribe to our newsletter to get updates on our
        latest offers!
      </p>

      <form className="subscribe-form">
        <input
          className="subscribe-form__input"
          type="email"
          placeholder="Enter your email"
        />
        <button className="subscribe-form__button" type="submit">
          Subscribe
        </button>
      </form>

      <div className="product-review" id="product-review">
        <h3 className="product-review__title">Product Reviews</h3>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input
            className="review-form__input"
            type="number"
            placeholder="Product ID"
            name="product_id"
            value={review.product_id}
            onChange={handleReviewChange}
            required
          />
          product_id
          <input
            className="review-form__input"
            type="number"
            placeholder="User ID"
            name="user_id"
            value={review.user_id}
            onChange={handleReviewChange}
            required
          />
          rating:
          <input
            className="review-form__input"
            type="number"
            placeholder="Rating"
            name="rating"
            value={review.rating}
            onChange={handleReviewChange}
            required
          />
          <textarea
            className="review-form__textarea"
            placeholder="Write your review..."
            name="comment"
            value={review.comment}
            onChange={handleReviewChange}
            required
          ></textarea>
          <button className="review-form__button" type="submit">
            Post Review
          </button>
        </form>
      </div>

      <p className="copyright">
        &copy; {new Date().getFullYear()} Sokoyetu. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
