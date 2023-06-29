import React from 'react'

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
        {['about', 'projects', 'portfolio', 'testimonials', 'contact'].map((item, index) => {
            return(
                <a 
                    href={`#${item}`}
                    key={item + index}
                    className='app__navigation-dot' 
                    style={ active===item ? { backgroundColor: '#2e6469'} : { }}
                />
            )
        })}
    </div>
  )
}

export default NavigationDots