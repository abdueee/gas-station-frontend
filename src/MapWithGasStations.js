import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './App.css'; // Ensure your CSS file is imported

const libraries = ['places'];

const initialCenter = {
  lat: 43.651070,
  lng: -79.347015,
};

const MapWithGasStations = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: '', // Replace with your actual API key
    libraries,
  });

  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    async function initializeMap() {
      // First, ensure the Google Maps script is fully loaded
      if (!isLoaded) return;
  
      // Attempt to fetch the user's current location
      const userLocation = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }, () => {
            // If there's an error (e.g., user denies location access), resolve to initialCenter
            resolve(initialCenter);
          });
        } else {
          // If Geolocation API isn't supported, resolve to initialCenter
          resolve(initialCenter);
        }
      });
  
      // Update center state to user's location or fallback to initialCenter
      setCenter(userLocation);
  
      // Ensure mapRef.current is set and valid before attempting to use PlacesService
      if (mapRef.current) {
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        service.nearbySearch({
          location: userLocation,
          radius: 5000,
          type: 'gas_station',
        }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            // Update markers state with the results
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
  }, [isLoaded]);

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

export default MapWithGasStations;
