import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Sidebar = ({ data }) => {
  // Extract the first address and price, and prepare the remaining addresses
  const firstAddress = data.addresses?.[0];
  const firstPrice = data.prices?.[0];
  const remainingAddresses = data.addresses?.slice(1); // Get all addresses except the first one

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="box">Gas Station: {firstAddress || 'Loading...'}</div>
        <div className="box">Price: {firstPrice || 'Loading...'}</div>
        <div className="box">
          Alternative Gas Stations:
          <ul>
            {remainingAddresses?.length > 0 ? (
              remainingAddresses.map((address, index) => (
                <li key={index}>{address}</li>
              ))
            ) : (
              <li>No alternative stations available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  data: PropTypes.shape({
    addresses: PropTypes.arrayOf(PropTypes.string),
    prices: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Sidebar;
