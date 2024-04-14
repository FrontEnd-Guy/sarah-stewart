import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import './Header.scss';
import { CarouselElement } from '../../components';

const captionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timerId, setTimerId] = useState(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.07], [1, 0.8, 0]);

  const handleCarouselClick = () => {
    setIsVisible(false);
    clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    setTimerId(newTimerId);
  };

  useEffect(() => {
    return () => clearTimeout(timerId);
  }, [timerId]);

  return (
    <header id="home" className="header">
      <CarouselElement
        className="header__slideshow"
        onClick={handleCarouselClick}
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="header__caption-container"
            variants={captionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 50, transition: { duration: 1 } }}
            transition={{
              delay: 0.5,
              duration: 1.5,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            style={{ opacity }}
          >
            <h1 className="head-text">Fine Bas Relief Plaster Paintings</h1>
            <p className="p-text">
              Commissions available
              <br />
              Studio visit by appointment only
              <br />
              Blue Mountain Beach, FL
            </p>
            <div className="header__buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="header__caption-button"
                onClick={() => (window.location.href = '#contact')}
              >
                Schedule Here
              </motion.button>
              <SocialButton
                icon={<FaFacebookF />}
                url="https://www.facebook.com/SarahStewartFineArt"
              />
              <SocialButton
                icon={<FaInstagram />}
                url="https://www.instagram.com/sarahstewartfineart/"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SocialButton = ({ icon, url }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="header__caption-button header__caption-button_social"
    onClick={() => window.open(url, '_blank')}
  >
    {icon}
  </motion.button>
);

export default Header;
