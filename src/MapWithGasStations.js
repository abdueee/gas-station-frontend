import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ['places'];
const initialCenter = { lat: 43.651070, lng: -79.347015 };

const MapWithGasStations = ({ onUserLocationChange, destination }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const [directionsResult, setDirectionsResult] = useState(null);

  // Fetch directions
  const fetchDirections = (origin, destinationCoords) => {
    if (!origin || !destinationCoords) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
      origin: origin,
      destination: destinationCoords,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionsResult(result);
        adjustMapBoundsToDirections(result); // Adjust the map's bounds
      } else {
        console.error(`Directions request failed due to ${status}`);
      }
    });
  };

  const adjustMapBoundsToDirections = (directionsResult) => {
    if (!mapRef.current || !directionsResult) return;
  
    const bounds = new window.google.maps.LatLngBounds();
    directionsResult.routes[0].overview_path.forEach(segment => {
      bounds.extend(segment);
      
    });
    mapRef.current.fitBounds(bounds);
  };  

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !destination) return;

    // Simulate fetching user location
    const simulateFetchUserLocation = async () => {
      // Example user location fetch
      const userLocation = { lat: 43.651070, lng: -79.347015 }; // Placeholder for actual user location
      setCenter(userLocation);
      onUserLocationChange(userLocation);

      // Fetch directions if destination is provided
      fetchDirections(userLocation, destination);
    };
    simulateFetchUserLocation();
  }, [isLoaded, onUserLocationChange, destination, fetchDirections]);

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="map-enclosure">
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        onLoad={map => mapRef.current = map}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
        {directionsResult && (
          <DirectionsRenderer
            directions={directionsResult}
            options={{ preserveViewport: false }} // Ensure this is false or omitted
            onLoad={(directionsRenderer) => {
              // Adjust map after DirectionsRenderer has rendered the route
              const bounds = new window.google.maps.LatLngBounds();
              directionsResult.routes[0].overview_path.forEach(segment => {
                bounds.extend(segment);
              });
              mapRef.current.fitBounds(bounds);
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

MapWithGasStations.propTypes = {
  onUserLocationChange: PropTypes.func.isRequired,
  destination: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

export default MapWithGasStations;
