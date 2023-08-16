import React from 'react';

import './About.scss';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';

const About = () => {
  return (
    <>
      <h2 className="head-text">
        Meet the <span className="span-text">Artist</span>
      </h2>
      <div className="app__about-info">
        <div className="app__about-photo">
          <img src={images.about} alt="Sarah Stewart" />
        </div>
        <div className="app__about-bio">
          <h3 className="bold-text">Sarah Stewart</h3>
          <p className="p-text" style={{ marginTop: 10 }}>
            Sarah Stewart is a bas relief plaster artist, poet and illustrator
            who has called the Emerald Coast home for 25 years. Her work can be
            found at The Studio Gallery in Grayton Beach, FL and Arriaga Jewelry
            in Seacrest, FL. She and her artist father, William Edwards have a
            studio in Blue Mountain Beach, FL where they meet clients by appt.
          </p>
          <p className="p-text" style={{ marginTop: 10 }}>
            Sarah grew up in New York but got to the South as quick as she
            could. She finds inspiration in nature, travels and music. When not
            creating in the studio she loves to take shelling trips with her
            three children and support the arts in her community. She created a
            line of illustrated seashells to share positive messages in 2009
            called Sarah’s Reef. Her faith plays a central and defining role in
            her life.{' '}
          </p>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__primarybg',
);
