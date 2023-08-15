import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { client, urlFor } from '../../client';

import './Carousel.scss';

const CarouselElement = (props) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true); 

  const fetchImages = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    const queryType = isLandscape ? "horizontalSlideshow" : "verticalSlideshow";
    
    client.fetch(`*[_type == "${queryType}"] | order(order asc) {
        title,
        image
     }`).then(data => {
      setImages(data);
      setLoading(false);  // Устанавливаем состояние загрузки в false после успешной загрузки данных
    }).catch(error => {
      console.error(error);
      setLoading(false);  // Даже если произошла ошибка, нам следует установить состояние загрузки в false
    });
  };

  useEffect(() => {
    fetchImages();
    
    window.addEventListener('resize', fetchImages);
    
    return () => window.removeEventListener('resize', fetchImages);
  }, []);

  if (loading) {
    return (
        <div className='loading-indicator'>
            <span className="dot" style={{ "--i": 1 }}></span>
            <span className="dot" style={{ "--i": 2 }}></span>
            <span className="dot" style={{ "--i": 3 }}></span>
        </div>
    );
}
    
  return (
    <Carousel
        indicators={false}
        interval={4000}
        pause={false}
        {...props}
    >
        {images.map((item) => {
            return(
                <Carousel.Item 
                    key={`carousel-${item.title}`}
                >   
                    <img
                        className='carousel-item__image'
                        src={urlFor(item.image)}
                        alt={item.title}
                    />
                </Carousel.Item>
            )
        })}
    </Carousel>
  );
}

export default CarouselElement;
