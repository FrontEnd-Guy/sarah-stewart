import React from 'react'

import './About.scss'

import { images } from '../../constants'
import { AppWrap } from '../../wrapper'

const About = () => {
  return (
        <section className="author">
            <h2 className='head-text'>About the Author</h2>
            <div className="author-info">
                <div className='author-photo'>
                    <img src={images.about} alt="Sarah Stewart" />
                </div>
                <div className="author-bio">
                    <h3 className='bold-text'>Sarah Stewart</h3>
                    <p className='p-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
                </div>
            </div>
        </section>
  )
}

export default AppWrap(About, 'about')