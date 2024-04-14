import { useEffect, useCallback } from 'react';
import { HiX } from 'react-icons/hi';
import { urlFor } from '../../client';

import './ImagePopup.scss';

export function ImagePopup({ isOpen, card, onClose }) {
  const closeOnOverlayClick = useCallback(
    (evt) => {
      if (evt.target.classList.contains('popup')) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Do not render the component at all if it's not open

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
            loading="lazy"
          />
        )}
        <figcaption className="p-text popup__figcaption">
          {card?.title}
        </figcaption>
        <HiX onClick={onClose} className="popup__close" aria-label="Close" />
      </figure>
    </div>
  );
}
