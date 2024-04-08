import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import MapWithGasStations from './MapWithGasStations'; // Make sure the import is correct
import Sidebar from './Sidebar';
import { debounce } from 'lodash';

const initialCenter = { lat: 43.65107, lng: -79.347015 };

const ParentComponent = () => {
  const [userCoordinates, setUserCoordinates] = useState(initialCenter);
  const [data, setData] = useState({ addresses: [], prices: [] });
  const [destination, setDestination] = useState(null);

  // Define the handleUserLocation function
  const handleUserLocation = useCallback((coordinates) => {
    setUserCoordinates(coordinates);
  }, []);

  const fetchPricesDebounced = useCallback(debounce((lat, lng) => {
    Axios.get(`http://127.0.0.1:8000/getPrices?lat=${lat}&lng=${lng}`)
      .then(response => {
        // Assuming the first address is used for the destination
        if (response.data.addresses.length > 0) {
          // Assuming you have a way to convert an address to lat/lng if needed
          const destinationCoords = response.data.addresses[0]; // Placeholder for actual conversion
          setDestination(destinationCoords); // Set the destination state
        }
        setData({ addresses: response.data.addresses, prices: response.data.prices });
        console.log("Full Axios response:", response.data);
      })
      .catch(error => console.error('Fetching prices failed:', error));
  }, 2000), []);

  // Invoke fetchPricesDebounced when userCoordinates change
  useEffect(() => {
    if (userCoordinates.lat && userCoordinates.lng) {
      fetchPricesDebounced(userCoordinates.lat, userCoordinates.lng);
    }
  }, [userCoordinates, fetchPricesDebounced]);

  return (
    <div className="parent-container">
      <MapWithGasStations onUserLocationChange={handleUserLocation} destination={destination} />
      <Sidebar data={data} />
    </div>
  );
};

export default ParentComponent;
