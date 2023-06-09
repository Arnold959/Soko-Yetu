import React, { useState } from "react";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Replace the API request URL with your actual FastAPI endpoint
    const apiUrl = `http://localhost:8000/products?search=${searchValue}`;

    try {
      // Make the API request
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
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

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    setCartCount(cartCount + 1);
  };

  const handleCheckout = () => {
    // Make API request to process the checkout using FastAPI
    // Example: await fetch('/api/cart/checkout', { method: 'POST' });

    // Display success message or perform any necessary actions
    alert("Product bought successfully");
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
      <div className="navbar__cart">
        <button className="navbar__cart-button">
          <i className="fas fa-shopping-cart"></i>
        </button>
        {cartItems.length > 0 && (
          <div className="navbar__cart-details">
            <span className="navbar__cart-count" id="cart-count">
              {cartCount}
            </span>
            <div className="navbar__cart-dropdown">
              <ul className="navbar__cart-items">
                {cartItems.map((item, index) => (
                  <li key={index} className="navbar__cart-item">
                    {item.name}
                  </li>
                ))}
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
