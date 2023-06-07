import React, { useState } from 'react';

const Footer = () => {
  const [review, setReview] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to submit the review
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review }),
    });

    if (response.ok) {
      // Review successfully submitted
      alert('Your review has been posted!');
      setReview(''); // Reset the review text
    } else {
      // Error submitting the review
      alert('Error submitting the review. Please try again.');
    }
  };

  return (
    <footer className="footer">
      <p className="footer__subscribe-text">NEW TO SOKOYETU? Subscribe to our newsletter to get updates on our latest offers!</p>

      <form className="subscribe-form">
        <input className="subscribe-form__input" type="email" placeholder="Enter your email" />
        <button className="subscribe-form__button" type="submit">Subscribe</button>
      </form>

      <div className="product-review" id="product-review">
        <h3 className="product-review__title">Product Reviews</h3>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <textarea
            className="review-form__textarea"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
          <button className="review-form__button" type="submit">Post Review</button>
        </form>
      </div>

      <p className="copyright">
        &copy; {new Date().getFullYear()} Sokoyetu. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
