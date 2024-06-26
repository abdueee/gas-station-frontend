import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={`${process.env.PUBLIC_URL}/gas_logo.jpg`} alt="Logo" className="logo" />
        <p>Fueling your next Adventure</p>
      </div>
    </header>
  );
};

export default Header;
