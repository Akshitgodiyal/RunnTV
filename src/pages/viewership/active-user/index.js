import React, { useState } from 'react';
import './activeUser.scss';
import plusicon from '../../../assets/images/plus-icon.png';
import minusicon from '../../../assets/images/minus-icon.png';
import AreaSelector from '../../../pages/viewership/dashboard-Map/AreaSelector';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../service/commonFunc';

function ActiveUser() {
  const [zoom, setZoom] = useState(1);
  const state = useSelector((state) => state);
 
  const MapDatastate = state?.MapData?.data?.data?.stateWiseActiveUsers;
  const channelName = state?.ChannelData?.data?.viewKey;


  const formatData = (data) => {
    const formattedData = [];
    for (const key in data) {
      const state = key.replace(':', '').trim();
      const population = parseFloat(data[key]) || 'N/A';
      formattedData.push({ state, population });
    }
    return formattedData;
  };

  // Sort the formatted data by population in descending order
  const sortedData = formatData(MapDatastate).sort(
    (a, b) => b.population - a.population
  );
// console.log("channelName",state.ChannelData);
  // Get the top 6 states
  const top6States = sortedData.slice(0, 6);

  return (
    <>
      <div className="active-user-block">
        <div className="top">
          <div className="left-side">
            <h4>Active Users</h4>
            <p>{channelName && channelName == "Total" ? "All Channels": channelName}</p>
          </div>

          <div className="zoom-map">
            <a onClick={() => setZoom(zoom + 0.2)} className="pulse">
              <img src={plusicon} alt="" />
            </a>
            <a onClick={() => setZoom(zoom - 0.2)} className="minus">
              <img src={minusicon} alt="" />
            </a>
          </div>
        </div>
        <div className="map-block">
          <AreaSelector zooms={zoom} />
        </div>
        <div className="top-state">
          <h6>Top 6 States Users</h6>
          <ul>
            {top6States.map(({ state, population }) => (
              <li key={state}>
                <span>{state}</span>
                <span>{formatNumber(population)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ActiveUser;
