import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './App.css'; // Ensure your CSS file is imported

// Define this outside of your component
const libraries = ['places'];

const center = {
  lat: 43.651070,
  lng: -79.347015,
};

const MapWithGasStations = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAykiO-H17ng8gybiRj2D4SXQeh9evK5aE', // Replace with your actual API key
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      // Only instantiate PlacesService when the script has loaded
      const service = new window.google.maps.places.PlacesService(mapRef.current);
      service.nearbySearch(
        { location: center, radius: 5000, type: 'gas_station' },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setMarkers(results.map(place => ({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            })));
          } else {
            console.error('Gas stations search failed:', status);
          }
        }
      );
    }
  }, [isLoaded, mapRef]); // Dependency array includes isLoaded

  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map-enclosure"> {/* Enclose the map with a div */}
      <GoogleMap
        mapContainerClassName="map-container" // Apply the map container styles
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
