import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
function AddProduct() {
  const [formData, setFormData] = useState({
    id: 1,
    name: "",
    image_url: "",
    price: 1,
    description: "",
    category_id: 1,
    stock: 1,
  });
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
       
        setFormData({
          id: "",
          name: "",
          image_url: "",
          price: "",
          description: "",
          category_id: "",
          stock: "",
        });
      });
  }
  console.log(formData);
  return (
    <div className="add">
      <Link to="/UpdateProduct">UpdateProduct</Link>
      <Link exact to="/">
        ProductList
      </Link>
      <Link to="/User">User</Link>
      

      <form>
        <h5>ADD-PRODUCT-HERE</h5>
        <br />
        <label type="text">id:</label>
        <input
          type="number"
          id="id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />

        <br />
        <label type="text">name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br />
        <label type="text">image_url:</label>
        <input
          type="text"
          id="image"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />
        <br />
        <label type="text">price:</label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <br />
        <label type="text">description:</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <br />
        <label type="text">category_id:</label>
        <input
          type="number"
          id="category"
          value={formData.category_id}
          onChange={(e) =>
            setFormData({ ...formData, category_id: e.target.value })
          }
        />
        <br />
        <label type="text">stock:</label>
        <input
          type="number"
          id="stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        <br />

        <button type="submit" onClick={handleSubmit}>
          ADD-PRODUCT
        </button>
      </form>
    </div>
  );
}
export default AddProduct;
