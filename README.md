# Gas Station Finder

## Introduction

Gas Station Finder is a React application that utilizes the Google Maps API, including Geolocation and Places services, to help users find nearby gas stations based on their current location. It aims to provide an intuitive and responsive map-based interface for an enhanced user experience. Feel free to check out the beta version here: https://gas-station-frontend.vercel.app/

## Features

- **User Location Detection**: Automatically detects and centers the map on the user's current location.
- **Google Maps Integration**: Displays an interactive map with markers for nearby gas stations.
- **Responsive Design**: Ensures compatibility across various devices and screen sizes.
- **Error Handling**: Handles errors gracefully, including cases where location access is denied.

## Setup and Installation

### Prerequisites

- Node.js
- A valid Google Maps API key with the Maps JavaScript API, Geolocation API, and Places API enabled.

### Getting Started

1. **Clone the Repository**
git clone https://github.com/yourusername/gas-station-finder.git
cd gas-station-finder

2. **Install Dependencies**
npm install

3. **Configure API Key**
Create a `.env` file in the root directory and add your Google Maps API key:

4. **Run the Application**
npm start

Visit `http://localhost:3000` in your browser to view the app.

## Usage

Once the application is running, it will prompt you to allow location access. Granting permission will automatically fetch and display nearby gas stations on the map. You can interact with the map and markers to explore different locations and gas station details.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. You can also open issues to report bugs or suggest new features.

## Acknowledgments

- **Google Maps Platform**: For providing the comprehensive APIs used in this project.
- **React**: For the frontend framework that makes this application possible.

