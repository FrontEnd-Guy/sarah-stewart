import React, {useEffect} from 'react';
import { motion } from 'framer-motion';

import './Projects.scss';

import { AppWrap, MotionWrap } from '../../wrapper';
import { useState } from 'react';
import { urlFor, client } from '../../client';

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
      <h2 className='head-text'>From <span className='span-text'>Plaster</span> to <span className='span-text'>Poetry</span></h2>
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