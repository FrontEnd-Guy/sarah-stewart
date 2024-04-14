import React, { useState, useEffect, useCallback } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 200);
  }, []);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100); // Throttling the event handler
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  return (
    <nav className={`app__navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['home', 'about', 'portfolio', 'contact'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 aria-label="Open Menu" onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            initial={{ x: 300, opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX aria-label="Close Menu" onClick={() => setToggle(false)} />
            <ul>
              {['home', 'about', 'portfolio', 'contact'].map((item) => (
                <li className="p-text" key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Utility function for throttling
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}

export default Navbar;
