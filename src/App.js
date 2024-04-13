import React, { useState, Suspense, lazy } from 'react';
import './App.scss';
import { Navbar } from './components';
import { ImagePopup } from './components/ImagePopup/ImagePopup';

// Lazy load components
const About = lazy(() => import('./container' ).then(module => ({ default: module.About })));
const Projects = lazy(() => import('./container' ).then(module => ({ default: module.Projects })));
const Footer = lazy(() => import('./container' ).then(module => ({ default: module.Footer })));
const Header = lazy(() => import('./container' ).then(module => ({ default: module.Header })));
const Testimonial = lazy(() => import('./container' ).then(module => ({ default: module.Testimonial })));
const Portfolio = lazy(() => import('./container' ).then(module => ({ default: module.Portfolio })));

const App = () => {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleClosePopup() {
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <About />
        <Portfolio onCardClick={handleCardClick} />
        <Projects />
        <Testimonial />
        <Footer />
      </Suspense>
      {isImagePopupOpen && (
          <ImagePopup
            card={selectedCard}
            onClose={handleClosePopup}
            isOpen={isImagePopupOpen}
          />
        )}
    </div>
  );
};

export default App;
