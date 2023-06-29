import React, { useState } from 'react';

import { About, Projects, Footer, Header, Testimonial, Portfolio } from './container';

import './App.scss';
import { Navbar } from './components';
import { ImagePopup } from './components/ImagePopup/ImagePopup';

const App = () => {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  function handleCardClick(card) {
    console.log(card);
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleClosePopup() {
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Projects />
      <Portfolio 
        onCardClick={handleCardClick}
      />
      <Testimonial />
      <Footer />
      <ImagePopup 
        card={selectedCard}
        onClose={handleClosePopup}
        isOpen={isImagePopupOpen}
      />
    </div>
  );
}

export default App;