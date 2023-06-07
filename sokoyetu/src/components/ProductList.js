import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch products from the database using FastAPI
    fetch('/api/products') // Replace with the actual endpoint URL
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

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
