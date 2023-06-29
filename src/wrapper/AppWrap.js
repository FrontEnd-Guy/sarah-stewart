import React from 'react'
import { NavigationDots, SocialMedia } from '../components'

const AppWrap = (Component, idName, classNames) => function HOC(props) {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className='app__wrapper app__flex'>
            <Component {...props}/>
            <div className='copyright'>
                <p className='p-text'>© {new Date().getFullYear()} Sarah Stewart</p>
                <p className='p-text'>All Rights Reserved</p>
            </div>
        </div>
        <NavigationDots active={idName} />
    </div>

  )
}

export default AppWrap