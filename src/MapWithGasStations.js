import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './App.css'; // Ensure your CSS file is imported

// Define this outside of your component
const libraries = ['places'];

const initialCenter = {
  lat: 43.651070,
  lng: -79.347015,
};

const MapWithGasStations = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAykiO-H17ng8gybiRj2D4SXQeh9evK5aE', // Replace with your actual API key
    libraries,
  });
  
  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(userLocation); // Update the map center
        // Optionally, you could also set a marker at the user's location
        setMarkers((prevMarkers) => [...prevMarkers, userLocation]);
      }, (error) => {
        console.error("Error obtaining location", error);
          // Fall back to default Toronto coordinates
          const torontoCoords = {
            lat: 43.651070,
            lng: -79.347015,
          };
          setCenter(torontoCoords);
      });
    }
  }, []); // This effect runs once on component mount

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
