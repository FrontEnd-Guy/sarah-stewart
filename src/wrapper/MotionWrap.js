import React from "react";
import { motion } from 'framer-motion';

const MotionWrap = (Component, classNames) => function HOC(props) {
  return (
    <motion.div
     initial={{ y: 100, opacity: 0 }} 
     whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
     transition={{ duration: 0.5 }}
     className={`${classNames} app__flex`}
    >
        <Component {...props}/>
    </motion.div>
  )
}

export default MotionWrap