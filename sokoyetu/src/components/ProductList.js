import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import Footer from './Footer';
import "../App.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch products from the database using FastAPI
    fetch('http://localhost:8000/products') // Replace with the actual endpoint URL
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  const handleAddToCart = () => {
    // Make API request to add item to cart using FastAPI
    // Example: await fetch(`/api/cart/add`, { method: 'POST', body: JSON.stringify({ product: productId }) });

    // Update the cart count in the UI
    setCartCount(cartCount + 1);
    alert('Added to cart successfully'); // Display success message
  };

  const handleRateProduct = (productId, rating) => {
    // Make API request to rate the product using FastAPI
    // Example: await fetch(`/api/products/${productId}/rate`, { method: 'POST', body: JSON.stringify({ rating }) });

    alert(`Rated product ${productId} with ${rating} stars`); // Display success message
  };

  return (
    <div className="product-list">
       <Link to="/AddProduct"products={products}>AddProduct</Link>
        <Link to="/UpdateProduct">UpdateProduct</Link>
         <Carousel />
      {products.map(product => (
        <div key={product.id} className="product">
          <h3 className="product-name">{product.name}</h3>
          <img src={product.image_url} alt={product.name} className="product-image" />
          <div className="price">${product.price}</div>
          <div className='description'>{product.description}</div>
        
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          <Link to={`/${product.id}`}>UpdateProduct</Link>
          <div className="rating">
            <span>Rate this product: </span>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`star ${star <= product.rating ? 'filled' : 'empty'}`}
                onClick={() => handleRateProduct(product.id, star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
     <Footer />
    </div>
  );
};

export default ProductList;
