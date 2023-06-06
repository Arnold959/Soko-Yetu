import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    'https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/30/posts/92882/image-upload/bootstrap_carousel_component.png', // Replace with your own image URLs
    'https://blog.hubspot.com/hs-fs/hubfs/How%20to%20Create%20a%20Carousel%20Slider%20for%20Your%20Website%20in%20Bootstrap%20CSS-1.gif?width=1500&name=How%20to%20Create%20a%20Carousel%20Slider%20for%20Your%20Website%20in%20Bootstrap%20CSS-1.gif',
    'https://blog.hubspot.com/hs-fs/hubfs/How%20to%20Create%20a%20Carousel%20Slider%20for%20Your%20Website%20in%20Bootstrap%20CSS-1.gif?width=1500&name=How%20to%20Create%20a%20Carousel%20Slider%20for%20Your%20Website%20in%20Bootstrap%20CSS-1.gif',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [carouselImages.length]);

  return (
    <div className="carousel-container">
    <h2>OFFER! OFFER! OFFER!</h2>
    <div className="carousel">
    <img
           src={carouselImages[currentImageIndex]}
           alt="Carousel Image"
           className="carousel-image"
         />
    </div>
    </div>
    );
    };

export default Carousel;
