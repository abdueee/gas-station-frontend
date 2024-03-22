/*import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapDefaults = {
  center: {
    lat: 43.651070,
    lng: -79.347015
  },
  zoom: 11
};

const MapInterface = () => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAykiO-H17ng8gybiRj2D4SXQeh9evK5aE' }} 
        defaultCenter={mapDefaults.center}
        defaultZoom={mapDefaults.zoom}
      >
        <AnyReactComponent
          lat={mapDefaults.center.lat}
          lng={mapDefaults.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapInterface;*/

import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapDefaults = {
  center: {
    lat: 43.651070,
    lng: -79.347015
  },
  zoom: 11
};

const MapInterface = () => {
  return (
    <div className="map">
      <div className="map-inner"> {/* New inner container */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAykiO-H17ng8gybiRj2D4SXQeh9evK5aE' }} // Remember to use your environment variable
          defaultCenter={mapDefaults.center}
          defaultZoom={mapDefaults.zoom}
        >
          <AnyReactComponent
            lat={mapDefaults.center.lat}
            lng={mapDefaults.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default MapInterface;

//AIzaSyAykiO-H17ng8gybiRj2D4SXQeh9evK5aE