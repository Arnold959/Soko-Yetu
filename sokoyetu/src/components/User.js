import React, { useState } from "react";
import { Link } from "react-router-dom";

const User = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();


    const apiUrl = "http://127.0.0.1:8000/users"; 

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone_number: parseInt(phoneNumber),
        email_address: emailAddress,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the API response as needed
        // Reset the form fields
        setName("");
        setPhoneNumber("");
        setEmailAddress("");
        setPassword("");
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  return (
    <div>
      <h2>Add User</h2>
      <Link to="/AddProduct">AddProduct</Link>
      <Link to="/UpdateProduct">UpdateProduct</Link>
      <Link to="/ProductList">ProductList</Link>
      
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default User;
