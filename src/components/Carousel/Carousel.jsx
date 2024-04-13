import React, { useState, useEffect, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { client, urlFor } from '../../client';
import { throttle } from 'lodash';

import './Carousel.scss';

const CarouselElement = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLandscape = useMemo(
    () => window.innerWidth > window.innerHeight,
    [window.innerWidth, window.innerHeight],
  );
  const queryType = isLandscape ? 'horizontalSlideshow' : 'verticalSlideshow';

  const fetchImages = () => {
    // Only fetch if not in cache or if the queryType changes
    if (!sessionStorage.getItem(queryType)) {
      client
        .fetch(
          `*[_type == "${queryType}"] | order(order asc) {
            title,
            image
          }`,
        )
        .then((data) => {
          setImages(data);
          setLoading(false);
          sessionStorage.setItem(queryType, JSON.stringify(data)); // Cache the data
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError('Failed to load images');
        });
    } else {
      setImages(JSON.parse(sessionStorage.getItem(queryType)));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();

    const handleResize = throttle(() => {
      fetchImages();
    }, 1000);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [queryType]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <span className="dot" style={{ '--i': 1 }}></span>
        <span className="dot" style={{ '--i': 2 }}></span>
        <span className="dot" style={{ '--i': 3 }}></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Carousel indicators={false} interval={4000} pause={false} {...props}>
      {images.map((item) => (
        <Carousel.Item key={`carousel-${item.title}`}>
          <img
            className="carousel-item__image"
            src={urlFor(item.image)}
            alt={item.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselElement;
