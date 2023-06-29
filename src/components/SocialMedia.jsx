import React from 'react'
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi'

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
            <TfiEmail />
        </div>
        <div>
            <FaFacebookF />
        </div>
        <div>
            <BsInstagram />
        </div>
    </div>
  )
}

export default SocialMedia