// import React, { useState, useEffect } from 'react';

// const Carousel = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const carouselImages = [
//     'https://www.shutterstock.com/shutterstock/videos/1045012438/thumb/1.jpg', // Replace with your own image URLs
//     'https://grammarvocab.com/wp-content/uploads/2022/11/Slide1-3-4-1024x576.jpg',
//     'https://www.pngfind.com/pngs/m/441-4419685_ordinateurs-maroc-computer-sales-repair-hd-png-download.png',
//     'https://ke.jumia.is/cms/2023/W23/Adidas/Wed/712x384.jpg',
//     'https://ke.jumia.is/cms/2023/W23/CP/Sliders/Desktop/_SComputing.jpg',
    
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [carouselImages.length]);

//   return (
//     <div className="carousel-container">
//     <h2>OFFER! OFFER! OFFER!</h2>
//     <div className="carousel">
//     <img
//            src={carouselImages[currentImageIndex]}
//            alt="Carousel Image"
//            className="carousel-image"
//          />
//     </div>
//     </div>
//     );
//     };

// export default Carousel;
