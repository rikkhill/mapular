import React, { Component } from 'react';
import { geoPath } from 'd3-geo';

class SVGMap extends Component {


  path = (d) => {
    return geoPath().projection(this.props.projection)(d);
  }

  render() {

    return(
      <svg
        className="map"
        width={ 800 }
        height={ 450 }
        viewBox="0 0 800 450"
      >
        <g className="geographies">
          { this.props.geographies.map((geography, i) =>
            <path
              key={i}
              d={ this.path(geography) }
              className="geography"
              fill="#6699AA"
              stroke="#212121"
              strokeWidth={ 0.5 }
            /> )}
        </g>
      </svg>
    );
  }

}

export default SVGMap