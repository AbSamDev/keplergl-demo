# Kepler.gl Demo Project

A powerful data visualization demo using Kepler.gl with React, showcasing interactive heatmap visualization of store data using H3 geospatial indexing.

## Features

- Interactive heatmap visualization
- H3 geospatial index integration
- Real-time data transformation
- Store data visualization
- Automatic map centering

## Tech Stack

- React 
- Kepler.gl
- Redux
- H3-js
- SWR
- React-Palm

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/yourusername/keplergl-demo.git
```
2. Install dependencies:
```
cd keplergl-demo
npm install
```
3. Create .env file in the root directory:
```
REACT_APP_MAPBOX_API=your_mapbox_token_here
```
Get the mapbox token from https://www.mapbox.com/
- Sign up/Login to Mapbox
- Navigate to Account → Tokens
- Create a new token with the required scopes
- Copy the token to your .env file


4. Start the development server:
```
npm start
```
5. Open your browser and navigate to http://localhost:3000 to view the demo.


See Demo image below:
![image](https://github.com/user-attachments/assets/094edc66-9b4f-4ec3-8f5b-a61c17dbf955)
