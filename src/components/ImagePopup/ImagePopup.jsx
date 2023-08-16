import { useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { urlFor } from '../../client';

import './ImagePopup.scss';

export function ImagePopup({ isOpen, card, onClose }) {
  function closeOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      onClose();
    }
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${card ? 'popup_opened' : ''}`}
      onClick={closeOnOverlayClick}
    >
      <figure className="popup__figure">
        {card && (
          <img
            className="popup__image"
            src={urlFor(card.imgUrl)}
            alt={card?.title}
          />
        )}
        <figcaption className="p-text popup__figcaption">
          {card?.title}
        </figcaption>
        <HiX onClick={onClose} className="popup__close" />
      </figure>
    </div>
  );
}
