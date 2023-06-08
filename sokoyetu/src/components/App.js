import React from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';
import ProductList from './ProductList';

const App = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <ProductList />
      <Footer />
    </div>
  );
};

export default App;
