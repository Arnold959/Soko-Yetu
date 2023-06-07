import React, { useState } from 'react';
import Modal from 'react-modal';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
  
    // Replace the API request URL with your actual FastAPI endpoint
    const apiUrl = `https://your-fastapi-endpoint.com/api/products?search=${searchValue}`;
  
    try {
      // Make the API request
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      // Parse the response
      const data = await response.json();
  
      // Handle the filtered products, such as updating the UI or state
      console.log(data);
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during the API request
    }
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = () => {
    // Make API request to add item to cart using FastAPI
    // Example: await fetch(`/api/cart/add`, { method: 'POST', body: JSON.stringify({ product: productId }) });
    // Update the cart count in the UI
    setCartCount(cartCount + 1);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Login successful, update the UI accordingly
        setIsLoggedIn(true);
        setUsername(email); // Assuming email is the username
        setLoginModalOpen(false);
      } else {
        // Login failed, handle the error response
        const data = await response.json();
        console.log('Login failed:', data.message); // You can replace this with your desired error handling
      }
    } catch (error) {
      console.log('Login error:', error); // Handle any network or server errors
    }
  };
  
  const handleLogout = async () => {
    try {
      await fetch('/api/logout');
  
      // Logout successful, update the UI accordingly
      setIsLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.log('Logout error:', error); // Handle any network or server errors
    }
  };
  
  const handleSignup = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Signup successful, update the UI accordingly
        setIsLoggedIn(true);
        setUsername(email); // Assuming email is the username
        setSignupModalOpen(false);
      } else {
        // Signup failed, handle the error and show an appropriate message to the user
        const errorData = await response.json();
        console.log('Signup error:', errorData); // Handle the error response
        // Optionally, you can show an error message to the user using state or a toast notification library
      }
    } catch (error) {
      console.log('Signup error:', error); // Handle any network or server errors
    }
  };
  
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  const handleCheckout = () => {
    // Make API request to process the checkout using FastAPI
    // Example: await fetch('/api/cart/checkout', { method: 'POST' });

    // Display success message or perform any necessary actions
    alert('Product bought successfully');
    setCartCount(0);
  };

  const handleCancelCart = () => {
    // Make API request to cancel the cart items using FastAPI
    // Example: await fetch('/api/cart/cancel', { method: 'POST' });

    // Update the cart count
    setCartCount(0);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">SokoYetu</h1>
      <form onSubmit={handleSearch} className="navbar__search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="navbar__search-input"
        />
        <button type="submit" className="navbar__search-button">
          <i className="fas fa-search"></i>
          Search
        </button>
      </form>
      <select
        className="navbar__category-dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        <option value="health_beauty">Health and Beauty</option>
        <option value="home_office">Home and Office</option>
        <option value="appliances">Appliances</option>
        <option value="phones_tablets">Phones and Tablets</option>
        <option value="computing">Computing</option>
        <option value="tvs_audio">TVs and Audio</option>
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
            <button className="navbar__login-button" onClick={openLoginModal}>
              <i className="fas fa-sign-in-alt"></i>
              Login
            </button>
            <button className="navbar__signup-button" onClick={openSignupModal}>
              <i className="fas fa-user-plus"></i>
              Signup
            </button>
          </>
        )}
        <Modal
          isOpen={loginModalOpen}
          onRequestClose={closeLoginModal}
          contentLabel="Login Modal"
          className="modal__container"
        >
          <h2 className="modal__title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal__input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal__input"
          />
          <button onClick={handleLogin} className="modal__button">
            Login
          </button>
        </Modal>

        <Modal
          isOpen={signupModalOpen}
          onRequestClose={closeSignupModal}
          contentLabel="Signup Modal"
          className="modal__container"
        >
          <h2 className="modal__title">Signup</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal__input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal__input"
          />
          <button onClick={handleSignup} className="modal__button">
            Signup
          </button>
        </Modal>
      </div>
      <div className="navbar__cart">
        <button className="navbar__cart-button" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart"></i>
        </button>
        {cartCount > 0 && (
          <div className="navbar__cart-details">
            <span className="navbar__cart-count" id="cart-count">
              {cartCount}
            </span>
            <div className="navbar__cart-dropdown">
              <ul className="navbar__cart-items">
                {/* Render the cart items here */}
                {/* Example: */}
                <li className="navbar__cart-item">Product 1</li>
                <li className="navbar__cart-item">Product 2</li>
              </ul>
              <div className="navbar__cart-actions">
                <button
                  className="navbar__cart-checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <button
                  className="navbar__cart-cancel-button"
                  onClick={handleCancelCart}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
