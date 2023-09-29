import React, { useState } from 'react';
import down_arrow from "../../../assets/images/down-arrow.svg";
import filter_alt from "../../../assets/images/filter_alt.svg";
import { TimeConverter } from '../../../service/commonFunc';

function AccordionTableHead({ data, onTableHeadClick, onToggle }) {
  const TableHeadData = data;
  const [sortOrders, setSortOrders] = useState({}); // Store sorting orders for each column

  const defaultSortColumn = "showName"; // Default sorting column

  const toggleSortOrder = (columnValue) => {
    const currentSortOrder = sortOrders[columnValue] || "showName"; // Default to "desc" if not set
    const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

    // Update the sorting order for the clicked column
    setSortOrders({ ...sortOrders, [columnValue]: newSortOrder });
    const combinedData = {
      sort: newSortOrder,
      key: columnValue,
    };
    onTableHeadClick(combinedData);

  };


  

  return (
    <div className="table-row">
      <div className="table-col name" onClick={() => onToggle()}>
        <div className='icon'><img src={down_arrow} alt="Down Arrow" /></div>
        <span onClick={(e) => { e.stopPropagation(); toggleSortOrder("showName"); }}>
          {TableHeadData?.viewKey}
        </span>
        <div className="filter-block">
          {/* <a href='#' className='filter-icon'>
            <img src={filter_alt} alt="Filter" />
          </a> */}
        </div>
      </div>
      <div className="table-col" onClick={() => onToggle()} >
        <span onClick={(e) => { e.stopPropagation(); toggleSortOrder("numberOfActiveUsers") }}>
          {TableHeadData?.numberOfActiveUsers}
        </span>
      </div>
      <div className="table-col" onClick={() => onToggle()}>
  <span onClick={(e) => { e.stopPropagation(); toggleSortOrder("totalWatchHours") }}>
    {TableHeadData?.totalWatchHours.toFixed(2)} Hrs
  </span>
</div>

<div className="table-col" onClick={() => onToggle()}>
  <span onClick={(e) => { e.stopPropagation(); toggleSortOrder("averageWatchTimePerUser") }}>
    {TimeConverter(TableHeadData?.averageWatchTimePerUser)}
  </span>
</div>

<div className="table-col" onClick={() => onToggle()}>
  <span onClick={(e) => { e.stopPropagation(); toggleSortOrder("averageWatchTimePerSession") }}>
    {TimeConverter(TableHeadData?.averageWatchTimePerSession)}
  </span>
</div>

<div className="table-col" onClick={() => onToggle()}>
  <span onClick={(e) => { e.stopPropagation(); toggleSortOrder("totalAdImpression") }}>
    {TableHeadData?.totalAdImpression}
  </span>
</div>

    </div>
  );
}

export default AccordionTableHead;
