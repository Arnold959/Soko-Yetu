import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch products from the database using FastAPI
    let apiUrl = 'http://localhost:8000/products'; // Replace with the actual endpoint URL
    if (selectedCategory) {
      apiUrl += `?category=${selectedCategory}`;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    // Add the selected product to the cart items
    setCartItems([...cartItems, product]);

    // Update the cart count in the UI
    setCartCount(cartCount + 1);
  };

  const handleRateProduct = (productId, rating) => {
    // Make API request to rate the product using FastAPI
    // Example: await fetch(`/api/products/${productId}/rate`, { method: 'POST', body: JSON.stringify({ rating }) });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Make API request to delete the product using FastAPI
      await fetch(`http://localhost:8000/product/delete/${productId}`, { method: 'DELETE' });

      // Update the products list by filtering out the deleted product
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product">
          <h3 className="product-name">{product.name}</h3>
          <img src={product.image_url} alt={product.name} className="product-image" />
          <div className="price">${product.price}</div>
          <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
          <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
            Delete
          </button>

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
    </div>
  );
};

export default ProductList;
