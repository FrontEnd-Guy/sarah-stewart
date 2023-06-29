import React from 'react';
import { FaFacebookF, FaInstagram} from 'react-icons/fa';
import { motion } from 'framer-motion';

import './Header.scss';
import { CarouselElement } from '../../components';

const Header = () => {
  return (
    <header id='home' className='header'>
      <CarouselElement />
      <motion.div 
        className='header__caption-container'
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
          <button className='header__caption-button'> 
            schedule here
          </button>
          <button className='header__caption-button header__caption-button_social'><FaFacebookF/></button>
          <button className='header__caption-button header__caption-button_social'><FaInstagram/></button>
        </div>
      </motion.div>
    </header>
  )
}

export default Header