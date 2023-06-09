import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch products from the database using FastAPI
    let apiUrl = "http://localhost:8000/products"; // Replace with the actual endpoint URL
    if (selectedCategory) {
      apiUrl += `?category=${selectedCategory}`;
    }
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, [selectedCategory]);

  const handleBuy = (productId) => {
    // Disable the card by updating the product's "disabled" property
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, disabled: true };
        }
        return product;
      })
    );
  };

  const handleDelete = (productId) => {
    // Remove the card from the products list
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="product-list">
      <Link to="/AddProduct">AddProduct</Link>
      <Link to="/UpdateProduct">UpdateProduct</Link>
      <Link to="/User">User</Link>

      <div className="filter-category">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>{" "}
          {/* Add your category options here */}
          <option value="category2">Category 2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className={`product ${product.disabled ? "disabled" : ""}`}
        >
          <h3 className="product-name">{product.name}</h3>
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
          />
          <div className="price">${product.price}</div>
          <div className="description">{product.description}</div>

          {!product.disabled ? (
            <button
              onClick={() => handleBuy(product.id)}
              className="buy-button"
            >
              Buy
            </button>
          ) : (
            <button className="buy-button" disabled>
              Bought
            </button>
          )}

          <button
            onClick={() => handleDelete(product.id)}
            className="delete-button"
          >
            Delete
          </button>

          <Link to={`/${product.id}`}>Update Product</Link>
          <div className="rating">
            <span>Rate this product: </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= product.rating ? "filled" : "empty"
                }`}
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
