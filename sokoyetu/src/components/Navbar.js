import React, { useState } from 'react';


const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    // Make API request to search for products by name using FastAPI
    // You can use the fetch or axios library to make the request
    // Example: const response = await fetch(`/api/products?search=${searchValue}`);
    // Handle the response and update the UI accordingly
  };

  const handleAddToCart = () => {
    // Make API request to add item to cart using FastAPI
    // Example: await fetch(`/api/cart/add`, { method: 'POST', body: JSON.stringify({ product: productId }) });
    // Update the cart count in the UI
    setCartCount(cartCount + 1);
  };

  const handleLogin = async () => {
    // Make API request to login using FastAPI
    // Example: const response = await fetch(`/api/login`, { method: 'POST', body: JSON.stringify({ username, password }) });
    // Handle the response and update the UI accordingly
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Make API request to logout using FastAPI
    // Example: await fetch(`/api/logout`);
    // Update the UI
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleSignup = async () => {
    // Make API request to signup using FastAPI
    // Example: const response = await fetch(`/api/signup`, { method: 'POST', body: JSON.stringify({ username, password }) });
    // Handle the response and update the UI accordingly
    setIsLoggedIn(true);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">Sokoyetu</h1>
      <form onSubmit={handleSearch} className="navbar__search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="navbar__search-input"
        />
        <button type="submit" className="navbar__search-button">Search</button>
      </form>
      <select className="navbar__category-dropdown">
        <option value="">All Categories</option>
        {/* Add categories options here */}
      </select>
      <div className="navbar__auth">
        {isLoggedIn ? (
          <>
            <button className="navbar__logout-button" onClick={handleLogout}>
              Logout
            </button>
            <span className="navbar__username">Welcome, {username}</span>
          </>
        ) : (
          <>
            <button className="navbar__login-button" onClick={handleLogin}>
              Login
            </button>
            <button className="navbar__signup-button" onClick={handleSignup}>
              Signup
            </button>
          </>
        )}
      </div>
      <div className="navbar__cart">
        <button className="navbar__cart-button" onClick={handleAddToCart}>
          Cart
        </button>
        <span className="navbar__cart-count" id="cart-count">
          {cartCount}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
