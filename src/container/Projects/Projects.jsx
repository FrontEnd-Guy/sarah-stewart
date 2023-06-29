import React from 'react';
import { motion } from 'framer-motion';

import './Projects.scss';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';


const projects =[
  {
    title: "Plaster Paintings",
    desctiption: "Capturing the subtleties of emotions and landscapes, Sarah's Plaster Paintings blend texture and color into evocative, immersive art pieces.",
    imageUrl: images.project01
  },
  {
    title: "Sarah's Reef",
    desctiption: "Painting on sea shelves, Sarah's Reef project transforms nature's beauty into uniquely textured, maritime-themed masterpieces.",
    imageUrl: images.project02
  },
  {
    title: "Poetry Book",
    desctiption: "Sarah's poetry book intertwines vivid imagery and deep sentiment, weaving a literary tapestry that tugs at the heartstrings of its readers.",
    imageUrl: images.project03
  },
  {
    title: "Arno from 30A",
    desctiption: "Bringing to life the joy and curiosity of childhood, 'Arno from 30A' is a children's book series that sparks imagination and adventure in its young readers.",
    imageUrl: images.project03
  }
]

const Projects = () => {

  return (
    <section id='projects' className='projects'>
      <h2 className='head-text'>Projects</h2>
      <div className='projects__container'>
        {projects.map((project, index) => (
         <motion.div
            whileInView={{opacity: 1}}
            whileHover={{scale: 1.1}}
            transition={{duration: .5, type: 'tween'}} 
            className='projects__item'
            key={project.title + index}
          >
            <img src={project.imageUrl} alt={project.title}/>
            <h3 className='bold-text' style={{marginTop: 20}}>{project.title}</h3>
            <p className='p-text' style={{marginTop: 10}}>{project.desctiption}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default AppWrap(Projects, 'projects')