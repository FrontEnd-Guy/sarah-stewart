import React from 'react';
import { FaFacebookF, FaInstagram} from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

import './Header.scss';
import { CarouselElement } from '../../components';

const Header = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <header id='home' className='header'>
      <CarouselElement />
      <motion.div 
        className='header__caption-container'
        style={{ opacity }}
        whileInView={{ x: [-100,0], opacity: [0, 1] }}
        transition={{duration: .5}}>
        <h1 className='head-text' style={{color: "#fff", maxWidth: "400px", textAlign: "left"}}>
          Fine bas relief plaster paintings
        </h1>
        <p className='p-text'style={{color: "#fff"}}>
          Commisions available<br/>
          Studio visit by appointment{"\u00A0"}only<br/>
          Blue Mountain Beach, FL
        </p>
        <div className='header__buttons'>
          <button className='header__caption-button' onClick={() => window.location.href = '#contact'}> 
            schedule here
          </button>
          <button 
            className='header__caption-button header__caption-button_social'
            onClick={() => window.open('https://www.facebook.com/SarahStewartFineArt', '_blank')}>
              <FaFacebookF/>
          </button>
          <button 
            className='header__caption-button header__caption-button_social'
            onClick={() => window.open('https://www.instagram.com/sarahstewartfineart/', '_blank')}>
              <FaInstagram/>
          </button>
        </div>
      </motion.div>
    </header>
  )
}

export default Header