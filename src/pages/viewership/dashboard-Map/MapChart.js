import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { geoCentroid, geoPath } from "d3-geo"; // Import geoCentroid and geoPath
import { useSelector } from "react-redux";

import india from './topojsons/india.json';
import "./MapChart.scss"
import { formatNumber } from "../../../service/commonFunc";

const MapChart = ({ setTooltipContent, setStateName, setShowDistrict, setzoom }) => {
  const state = useSelector((state) => state);
  const MapDatastate = state?.MapData?.data;
  const [MapStateData, setMapStateData] = useState([{ name: 'Bihar', percentage: 0.0 }]);

  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    if (MapDatastate?.data?.stateWiseActiveUsers != undefined || MapDatastate?.data?.stateWiseActiveUsers != null) {
      setMapStateData(MapDatastate?.data?.stateWiseActiveUsers)
    }
    
    const formattedData = [];
    for (const [name, percentage] of Object.entries(MapStateData)) {
      formattedData.push({ name, percentage: ((percentage/MapDatastate?.data?.maxActiveUsers)), activeUser:(percentage)  });
    }
    setStateData(formattedData);
    // console.log(formattedData);
  }, [state?.MapData?.data, MapStateData]);

  const getColorByPercentage = (percentage) => {
    const startColor = "#ffffff";
    const endColor = "#005ce6";
    const lightblue = "#eaf2fd";
    if ((0 < percentage) && (percentage < 0.2)) {
      return lightblue;
    }
   

    const segmentWidth = 1 / 5;
    const segment = Math.floor(percentage / segmentWidth);
    const r = Math.round(parseInt(startColor.slice(1, 3), 16) * (1 - (segment * segmentWidth)) + parseInt(endColor.slice(1, 3), 16) * (segment * segmentWidth));
    const g = Math.round(parseInt(startColor.slice(3, 5), 16) * (1 - (segment * segmentWidth)) + parseInt(endColor.slice(3, 5), 16) * (segment * segmentWidth));
    const b = Math.round(parseInt(startColor.slice(5, 7), 16) * (1 - (segment * segmentWidth)) + parseInt(endColor.slice(5, 7), 16) * (segment * segmentWidth));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
 
  const handleMouseEnter = (geo) => {
    const { ST_NM } = geo.properties;
    setTooltipContent(ST_NM);
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleMouseMove = (e) => {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.left = e.pageX + "px";
      tooltip.style.top = e.pageY + "px";
    }
  };
  
  return (
    <>
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        width={150}
        height={150}
        projectionConfig={{ scale: 220 }}
        onMouseMove={handleMouseMove}
      >
        <ZoomableGroup zoom={setzoom} center={[80, 22]}>
          <Geographies geography={india}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateInfo = stateData.find(stateObj => stateObj.name === geo.properties.ST_NM);
                const percentage = stateInfo ? stateInfo.percentage : 0;
                const fill = getColorByPercentage(percentage);
const perce = stateInfo ? stateInfo?.activeUser : 0
                // Calculate the middle point of each state
                const path = geoPath().projection(geo.projection);
                const centroid = geoCentroid(geo);
                const [x, y] = path.centroid(geo);

                return (
                  <g key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      onMouseEnter={() => handleMouseEnter(geo)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill,
                          stroke: "#000",
                          strokeWidth: 0.05,
                          outline: "none"
                        },
                        hover: {
                          fill: "#eaf2fd",
                          stroke: "#005ce6",
                          strokeWidth: 0.6,
                          outline: "none"
                        },
                        pressed: {
                          fill: "#2E8B57",
                          stroke: "#2E8B57",
                          strokeWidth: 0.1,
                          outline: "none"
                        },
                      }}
                    />
                    {/* Display state name at the middle point */}
                    <Marker coordinates={[x, y]}>
  {/* Create a white background rectangle */}

  {/* Add the text on top of the white background */}
  <text 
  
   // Adjust the y-coordinate for text centering
    textAnchor="middle"
    dominantBaseline="middle"
    style={{
      fontFamily: "Arial, sans-serif",
      fontSize: 3,
      fill: "#000"
    }}
  >
    
    {perce === 0 ? null : formatNumber(perce) + ""}
    </text>
  </Marker>
                  </g>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MapChart;
