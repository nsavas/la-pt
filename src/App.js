import React, { Component } from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL, {HexagonLayer} from 'deck.gl';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MapboxAccessToken;

const initialViewState = {
  longitude: -118.2060162,
  latitude: 34.12131,
  zoom: 9.5,
  pitch: 45,
  bearing: 70
}

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    fetch('https://data.lacity.org/resource/8yfh-4gug.json?color=GY', {})
      .then(response => response.json()).then(data => {
        console.log(data);
        this.setState({
          data: data
        })
        console.log(this.state);
      })
  }

  _renderLayers() {
    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage: 1,
        data: [{
          coordinates: [-118.243683, 34.052235]
        }],
        elevationRange: [0, 3000],
        elevationScale: 4,
        extruded: true,
        getPosition: [-118.243683, 34.052235],
        lightSettings: LIGHT_SETTINGS,
        opacity: 1,
        radius: 200,
      })
    ];
  }

  render() {
    return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={initialViewState}
        controller={true}
      >
      <StaticMap 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        preventStyleDiffing={true}
        reuseMaps={true}/>
      </DeckGL>
    );
  }
}

export default App;
