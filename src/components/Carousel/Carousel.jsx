import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import { images } from '../../constants';
import './Carousel.scss';

const CarouselElement = () => {
    const carousel = [
        images.slide01,
        images.slide02,        
        images.slide03,
        images.slide04,
        images.slide05,
        images.slide06,
        images.slide07,
        images.slide08,
        images.slide09,
        images.slide10,
        images.slide11,
    ]
    return (
        <Carousel
            indicators={false}
            interval={4000}
            pause={false}
        >
            {carousel.map((item) => {
                return(
                    <Carousel.Item 
                        key={`carousel-${item}`}
                    >   
                        <img
                            className='carousel-item__image'
                            src={item}
                            alt={item}
                        />
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
}

export default CarouselElement;