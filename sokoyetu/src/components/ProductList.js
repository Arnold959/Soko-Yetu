import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch products from the database using FastAPI
    const apiUrl = "http://localhost:8000/products"; // Replace with the actual endpoint URL
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

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

  const handleDelete = async (productId) => {
    try {
      // Remove the card from the products list on the frontend
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      // Send a DELETE request to the backend API to delete the product
      const apiUrl = `http://127.0.0.1:8000/product/delete${productId}`; // Replace with the actual endpoint URL
      await fetch(apiUrl, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    // Filter products based on search term
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-list">

      <Link
      className="product_link"
       to="/AddProduct">AddProduct</Link>
      <Link to="/UpdateProduct">UpdateProduct</Link>
      <Link to="/User">User</Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {filteredProducts.map((product) => (
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

          <Link to={`/${product.id}`}>Update Product</Link>
          <button
            onClick={() => handleDelete(product.id)}
            className="delete-button"
          >
            Delete
          </button>
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
