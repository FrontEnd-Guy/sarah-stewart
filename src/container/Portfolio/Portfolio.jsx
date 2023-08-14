import React, { useState, useEffect} from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper'

import './Portfolio.scss';

import { urlFor, client } from '../../client';

// import { works as data } from '../../constants/works';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const Portfolio = ({onCardClick}) => {
  const [ activeFilter, setActiveFilter ] = useState('All');
  const [ animateCard, setAnimateCard ] = useState({y: 0, opacity: 1});
  const [ works, setWorks ] = useState([]);
  const [filterWork, setfilterWork] = useState([]);
  const [worksPerPage, setWorksPerPage] = useState(0);
  const [addWorks, setAddWorks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const settings = [
    { width: 1280, worksPerPage: 12, addWorks: 4 },
    { width: 990, worksPerPage: 9, addWorks: 3 },
    { width: 768, worksPerPage: 6, addWorks: 2 },
    { width: 320, worksPerPage: 4, addWorks: 1 }
  ];

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    const query = `*[_type == "works"]`;

    client.fetch(query)
      .then((data) => {
        setWorks(data);
        setfilterWork(data);
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const currentSetting = settings.find(
      (setting) => windowDimensions >= setting.width
    ) || settings[0];
    setWorksPerPage(currentSetting.worksPerPage);
    setAddWorks(currentSetting.addWorks);
  }, [windowDimensions]);

  const indexOfLastMovie = currentPage * worksPerPage;
  const currentWorks = filterWork.slice(0, indexOfLastMovie);

  const handleLoadMore = () => {
    setAnimateCard({y:-100, opacity:0});

    setTimeout(() => {
      setAnimateCard({y:0, opacity: 1});
      setCurrentPage(currentPage + addWorks/worksPerPage);
    }, 500)
  };

  const handlePortfolioFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({y:100, opacity:0});

    setTimeout(() => {
      setAnimateCard({y:0, opacity: 1});

      if(item === 'All') {
        setfilterWork(works);
      } else {
        setfilterWork(works.filter((work) => work.status === item.toLowerCase()))
      }
    }, 500)
  }

  return (
    <>
      <h2 className='head-text'>Sarah's Gallery</h2>
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
          { currentWorks.map((work, index) => 
            ( <div className='app__work-item app-flex' key={index}>
                <div className='app__work-img app-flex'>
                {work && <img 
                  src={urlFor(work.imgUrl)} 
                  alt={work.title}
                  onClick={() => { 
                    onCardClick(work);}} 
                />}
                </div>
                <div className='app__work-content app__flex'>
                  <h4 className='bold-text'>{work.title}</h4>
                  <p className='p-text' style={{marginTop: 10}}>{work.description}</p>
                  <div className='app__work-tag app__flex'>
                    <p className='p-text' style={{margin: 0}}>{work.status}</p>
                  </div>
                </div>
              </div>)
          )}
      </motion.div>
      {currentWorks.length < filterWork.length && (
        <button className='app__works-more app__flex' onClick={handleLoadMore}>
          More
        </button>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Portfolio, 'app__works'), 
  'portfolio',
  'app__primarybg'
);