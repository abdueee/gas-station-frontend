import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ['places'];
const initialCenter = { lat: 43.651070, lng: -79.347015 };

const MapWithGasStations = ({ onUserLocationChange }) => { // Accept the callback prop
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    async function initializeMap() {
      if (!isLoaded) return;

      const userLocation = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(location);
            //console.log("onUserLocationChange prop is:", typeof onUserLocationChange);
            onUserLocationChange(location); // Call the callback with the location
          }, () => {
            resolve(initialCenter); // Use initialCenter as a fallback
          });
        } else {
          resolve(initialCenter); // Use initialCenter if Geolocation API isn't supported
        }
      });

      setCenter(userLocation);

      if (mapRef.current) {
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        service.nearbySearch({
          location: userLocation,
          radius: 5000,
          type: 'gas_station',
        }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setMarkers(results.map(place => ({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            })));
          } else {
            console.error('Gas stations search failed:', status);
          }
        });
      }
    }
  
    initializeMap();
  }, [isLoaded, onUserLocationChange]); // Include onUserLocationChange in the dependency array

  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map-enclosure">
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={13}
        onLoad={map => mapRef.current = map}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </div>
  );
};

MapWithGasStations.propTypes = {
  onUserLocationChange: PropTypes.func.isRequired,
};

export default MapWithGasStations;
