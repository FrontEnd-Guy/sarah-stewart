import React, { useState, Suspense, lazy } from 'react';
import './App.scss';
import { Navbar } from './components';
import { ImagePopup } from './components/ImagePopup/ImagePopup';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'; // A custom loading spinner for better UX
import ErrorBoundary from './components/ErrorBoundary'; // A generic error boundary component

const About = lazy(() => import('./container').then(module => ({ default: module.About })));
const Projects = lazy(() => import('./container').then(module => ({ default: module.Projects })));
const Footer = lazy(() => import('./container').then(module => ({ default: module.Footer })));
const Header = lazy(() => import('./container').then(module => ({ default: module.Header })));
const Testimonial = lazy(() => import('./container').then(module => ({ default: module.Testimonial })));
const Portfolio = lazy(() => import('./container').then(module => ({ default: module.Portfolio })));

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
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
          <About />
          <Portfolio onCardClick={handleCardClick} />
          <Projects />
          <Testimonial />
          <Footer />
        </Suspense>
      </ErrorBoundary>
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
