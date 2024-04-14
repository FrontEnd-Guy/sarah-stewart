import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Footer.scss';
import BouncingMarker from '../../components/BouncingMarker';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const form = useRef();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID,
      )
      .then(
        (result) => {
          setLoading(false);
          setIsFormSubmitted(true);
        },
        (error) => {
          setLoading(false);
          console.log(error.text);
        },
      );
  };

  const position = [30.340402335049635, -86.1648273034751];

  return (
    <>
      <h2 className="head-text">
        Reach the <span className="span-text">Heart</span> of{' '}
        <span className="span-text">Emerald</span> Art
      </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:sarahstewartfineart@gmail.com" className="p-text">
            sarahstewartfineart@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+18505254800" className="p-text">
            (850) 525-4800
          </a>
        </div>
      </div>
      <div className="app__footer-container app__flex">
        <div className="form-container app__flex">
          {!isFormSubmitted ? (
            <form
              className="app__footer-form app__flex"
              ref={form}
              onSubmit={handleSubmit}
            >
              <h3 className="bold-text">Schedule studio visit today:</h3>
              <div className="app__flex">
                <input
                  className="p-text"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  required
                  onChange={handleChangeInput}
                />
              </div>
              <div className="app__flex">
                <input
                  className="p-text"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  required
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <textarea
                  className="p-text"
                  placeholder="Your Message"
                  value={message}
                  name="message"
                  required
                  onChange={handleChangeInput}
                />
              </div>
              <button type="submit" className="p-text">
                {loading ? `Sending...` : `Send Message`}
              </button>
            </form>
          ) : (
            <div>
              <h3 className="head-text">Thank you for getting in touch!</h3>
            </div>
          )}
        </div>
        <div className="leaflet-container">
          <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <BouncingMarker position={position} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
