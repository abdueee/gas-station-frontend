import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import Map from './MapWithGasStations';
import Sidebar from './Sidebar';
import {debounce} from 'lodash';

const initialCenter = { lat: 43.65107, lng: -79.347015 };

const ParentComponent = () => {
  const [userCoordinates, setUserCoordinates] = useState(initialCenter);
  const [data, setData] = useState({ addresses: [], prices: [] });

  // Create a debounced function
  const fetchPricesDebounced = useCallback(debounce((lat, lng) => {
    Axios.get(`http://127.0.0.1:8000/getPrices?lat=${lat}&lng=${lng}`)
      .then(response => {
        setData({ addresses: response.data.addresses, prices: response.data.prices });
        console.log("Full Axios response:", response.data);
      })
      .catch(error => {
        console.error('Fetching prices failed:', error);
      });
  }, 10000), []); // Empty dependency array means this is created once on mount

  const handleUserLocation = useCallback((coordinates) => {
    if (coordinates.lat !== userCoordinates.lat || coordinates.lng !== userCoordinates.lng) {
      setUserCoordinates(coordinates);
      fetchPricesDebounced(coordinates.lat, coordinates.lng); // Call the debounced function
    }
  }, [userCoordinates, fetchPricesDebounced]);
  

  useEffect(() => {
    // Check if userCoordinates have valid values before making the Axios call
    if (userCoordinates.lat && userCoordinates.lng) {
      Axios.get(`http://127.0.0.1:8000/getPrices?lat=${userCoordinates.lat}&lng=${userCoordinates.lng}`)
        .then(response => {
          // Update your state with the new data
          console.log("Full Axios response:", response.data);
          setData({ addresses: response.data.addresses, prices: response.data.prices });
        })
        .catch(error => {
          console.error('Fetching prices failed:', error);
          // Optionally update your state to reflect the error
        });
    }
  }, [userCoordinates]); // Depend on userCoordinates to re-run the effect when they change
  

  return (
    <div className="parent-container">
      <Map onUserLocationChange={handleUserLocation} />
      <Sidebar data={data} />
    </div>
  );
};

export default ParentComponent;
