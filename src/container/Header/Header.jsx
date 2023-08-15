import React from 'react';
import { FaFacebookF, FaInstagram} from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

import './Header.scss';
import { CarouselElement } from '../../components';

const captionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const Header = () => {
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.07], [1, 0.8, 0]);

  return (
      <header id='home' className='header'>
          <CarouselElement className='header__slideshow'/>
          <motion.div 
              className='header__caption-container'
              variants={captionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5, duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99] }}
              style={{ opacity }}
          >
            <h1 className='head-text' style={{color: "#fff", maxWidth: "400px", textAlign: "left"}}>
              Fine bas relief plaster paintings
            </h1>
            <p className='p-text'style={{color: "#fff"}}>
              Commisions available<br/>
              Studio visit by appointment{"\u00A0"}only<br/>
              Blue Mountain Beach, FL
            </p>
            <div className='header__buttons'>
                   <motion.button 
                       whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                       whileTap={{ scale: 0.95 }}
                       className='header__caption-button'
                       onClick={() => window.location.href = '#contact'}
                   >
                       schedule here
                   </motion.button>
                   <motion.button 
                       whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                       whileTap={{ scale: 0.95 }}
                       className='header__caption-button header__caption-button_social'
                       onClick={() => window.open('https://www.facebook.com/SarahStewartFineArt', '_blank')}>
                        <FaFacebookF/>
                   </motion.button>
                   <motion.button 
                       whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                       whileTap={{ scale: 0.95 }}
                       className='header__caption-button header__caption-button_social'
                       onClick={() => window.open('https://www.instagram.com/sarahstewartfineart/', '_blank')}>
                         <FaInstagram/>
                   </motion.button>
            </div>
          </motion.div>
        </header>
      )
    }

export default Header