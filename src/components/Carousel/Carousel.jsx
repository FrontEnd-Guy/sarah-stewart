import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { client, urlFor } from '../../client';

import './Carousel.scss';

const CarouselElement = () => {
    const [images, setImages] = useState([]);

      // Функция для загрузки изображений на основе ориентации экрана
  const fetchImages = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    const queryType = isLandscape ? "horizontalSlideshow" : "verticalSlideshow";
    
    client.fetch(`*[_type == "${queryType}"] | order(order asc) {
        title,
        image
     }`).then(data => {
      setImages(data);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchImages();
    
    // Добавить обработчик события изменения размера
    window.addEventListener('resize', fetchImages);
    
    // Удалить обработчик при размонтировании компонента
    return () => window.removeEventListener('resize', fetchImages);
  }, []);
    
    return (
        <Carousel
            indicators={false}
            interval={4000}
            pause={false}
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