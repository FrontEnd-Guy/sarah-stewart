import React, {useEffect} from 'react';
import { motion } from 'framer-motion';

import './Projects.scss';

import { AppWrap, MotionWrap } from '../../wrapper';
import { useState } from 'react';
import { urlFor, client } from '../../client';


// const projects =[
//   {
//     title: "Plaster Paintings",
//     desctiption: "Capturing the subtleties of emotions and landscapes, Sarah's Plaster Paintings blend texture and color into evocative, immersive art pieces.",
//     imageUrl: images.project01
//   },
//   {
//     title: "Sarah's Reef",
//     desctiption: "Painting on sea shelves, Sarah's Reef project transforms nature's beauty into uniquely textured, maritime-themed masterpieces.",
//     imageUrl: images.project02
//   },
//   {
//     title: "Poetry Book",
//     desctiption: "Sarah's poetry book intertwines vivid imagery and deep sentiment, weaving a literary tapestry that tugs at the heartstrings of it's readers.",
//     imageUrl: images.project03
//   },
//   {
//     title: "Arlo's Day on 30A",
//     desctiption: "Bringing to life the joy and curiosity of childhood, 'Arlo's Day on 30A' is a children's book series that sparks imagination and adventure in it's young readers.",
//     imageUrl: images.arlo
//   }
// ]

const Projects = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = `*[_type == "projects"]`;

    client.fetch(query)
      .then((data) => setProjects(data))
      .catch((error) => console.log(error))

  }, [])
  

  return (
    <>
      <h2 className='head-text'>Embracing Art: From Plaster to Poetry</h2>
      <div className='app__projects-container'>
        {projects.map((project, index) => (
         <motion.div
            whileInView={{opacity: 1}}
            whileHover={{scale: 1.1}}
            transition={{duration: .5, type: 'tween'}} 
            className='app__projects-item'
            key={project.title + index}
          >
            <img src={urlFor(project.imgUrl)} alt={project.title}/>
            <h3 className='bold-text' style={{marginTop: 20}}>{project.title}</h3>
            <p className='p-text' style={{marginTop: 10}}>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Projects, 'app__projects'),
   'projects',
   'app__whitebg'
  );