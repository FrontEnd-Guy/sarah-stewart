import React from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <TfiEmail onClick={() => (window.location.href = '#contact')} />
      </div>
      <div>
        <FaFacebookF
          onClick={() =>
            window.open(
              'https://www.facebook.com/SarahStewartFineArt',
              '_blank',
            )
          }
        />
      </div>
      <div>
        <BsInstagram
          onClick={() =>
            window.open(
              'https://www.instagram.com/sarahstewartfineart/',
              '_blank',
            )
          }
        />
      </div>
    </div>
  );
};

export default SocialMedia;
