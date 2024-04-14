import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { client, urlFor } from '../../client';
import './Carousel.scss';

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const useImages = (isLandscape) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(() => {
    const queryType = isLandscape ? 'horizontalSlideshow' : 'verticalSlideshow';
    const cachedImages = sessionStorage.getItem(queryType);

    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
      setLoading(false);
    } else {
      client
        .fetch(`*[_type == "${queryType}"] | order(order asc) { title, image }`)
        .then((data) => {
          setImages(data);
          sessionStorage.setItem(queryType, JSON.stringify(data));
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to load images');
          setLoading(false);
        });
    }
  }, [isLandscape]);

  useEffect(() => fetchImages(), [fetchImages]);

  return { images, loading, error, fetchImages }; // Return fetchImages here
};

const CarouselElement = React.memo((props) => {
  const isLandscape = useMemo(() => window.innerWidth > window.innerHeight, []);
  const { images, loading, error, fetchImages } = useImages(isLandscape); // Receive fetchImages here

  useEffect(() => {
    const handleResize = throttle(fetchImages, 1000);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [fetchImages]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <span className="dot" style={{ '--i': 1 }}></span>
        <span className="dot" style={{ '--i': 2 }}></span>
        <span className="dot" style={{ '--i': 3 }}></span>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <Carousel indicators={false} interval={4000} pause={false} {...props}>
      {images.map((item) => (
        <Carousel.Item key={`carousel-${item.title}`}>
          <img
            className="carousel-item__image"
            src={urlFor(item.image)}
            alt={item.title}
            loading="eager"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
});

export default CarouselElement;
