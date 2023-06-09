import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import User from "./User";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* <ul>
            <li>
              <Link to="/">ProductList</Link>
            </li>
            <li>
              <Link to="/AddProduct">Add Product</Link>
            </li>
            <li>
              <Link to="/UpdateProduct">Update Product </Link>
            </li>
          </ul> */}

        <Route path="/" element={<ProductList />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/:id" element={<UpdateProduct />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
