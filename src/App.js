import React, { Component } from 'react';
import { geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import SVGMap from './components/Map';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      geographies: [],
      projection: null,
    };
  }

  componentDidMount() {
    fetch('/data/london_ward_topology.json').then((response) => {
      if (response.status !== 200) {
        // Something weird happened
        console.log(`Some error happened: ${response.status}`);
      }

      response.json().then((data) => {

        const collection = feature(data, data.objects.features);

        this.setState({
          geographies: collection.features,
          projection: geoMercator()
                       .fitExtent([[10, 10], [800, 450]],
                                feature(data, data.objects.features)),
        });
      });
    });
  }

  render() {
    return (
      <SVGMap
        geographies={this.state.geographies}
        projection={this.state.projection}
      />
    );
  }
}

export default App;
