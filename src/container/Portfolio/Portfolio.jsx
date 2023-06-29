import React, { useState, useEffect} from 'react';
import { AiFillEye } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper'

import './Portfolio.scss';

import { works as data } from '../../constants/works';

const Portfolio = ({onCardClick}) => {

  const [ activeFilter, setActiveFilter ] = useState('All');
  const [ animateCard, setAnimateCard ] = useState({y: 0, opacity: 1});
  const [ works, setWorks ] = useState([]);
  const [filterWork, setfilterWork] = useState([])

  useEffect(() => {
    setWorks(data);
    setfilterWork(data);
  }, [data])

  const handlePortfolioFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({y:100, opacity:0});

    setTimeout(() => {
      setAnimateCard({y:0, opacity: 1});

      if(item === 'All') {
        setfilterWork(works);
      } else {
        setfilterWork(works.filter((work) => work.tag === item))
      }
    })
  }

  return (
    <>
      <h2 className='head-text'>Portfolio</h2>
      <div className='app__works-filter'>
        {['All', 'Available', 'Sold'].map((item, index) => {
          return (
            <div
            key={index}
            onClick={() => handlePortfolioFilter(item)}
            className={`app__works-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}>
              {item}
            </div>
          )
        })}
      </div>
      <motion.div
        animate={animateCard}
        transition={{opacity: 0.5, delayChildren: 0.5}}
        className='app__work-portfolio'>
          { filterWork.map((work, index) => 
            ( <div className='app__work-item app-flex' key={index}>
                <div className='app__work-img app-flex'>
                <img 
                  src={work.img} 
                  alt={work.title} 
                />
                  <motion.div 
                    whileHover={{opacity: [0,1]}}
                    transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.25}}
                    className="app__work-hover app__flex"
                    onClick={() => { 
                      console.log('Hover layer clicked'); 
                      onCardClick(work);}}
                  >
                    <motion.div
                      whileHInView={{scale: [1, 0.9]}}
                      transition={{duration: 0.25}}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </motion.div>
                </div>
                <div className='app__work-content app__flex'>
                  <h4 className='bold-text'>{work.title}</h4>
                  <p className='p-text' style={{marginTop: 10}}>{work.description}</p>
                  <div className='app__work-tag app__flex'>
                    <p className='p-text'>{work.tag}</p>
                  </div>
                </div>
              </div>)
          )}
      </motion.div>
    </>
  )
}

export default AppWrap(Portfolio, 'portfolio')