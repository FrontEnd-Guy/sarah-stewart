import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const BouncingMarker = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={
        new L.DivIcon({
          className: 'bouncing-marker',
          html: `<img src="${require('leaflet/dist/images/marker-icon.png')}" alt="marker" />`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>
        For plaster work, Sarah’s Reef seashells and painted paper cards visit
        The Studio Gallery in Grayton Beach
      </Popup>
    </Marker>
  );
};

export default BouncingMarker;
