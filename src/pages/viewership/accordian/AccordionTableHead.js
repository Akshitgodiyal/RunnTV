import React, { useState } from 'react';
import down_arrow from "../../../assets/images/down-arrow.svg";
import filter_alt from "../../../assets/images/sortarrow.png";
import { TimeConverter,formatNumber } from '../../../service/commonFunc';

function AccordionTableHead({ data, onTableHeadClick, onToggle,isOpen }) {
  const TableHeadData = data;
  const [sortOrders, setSortOrders] = useState({}); // Store sorting orders for each column

  const defaultSortColumn = "viewKey"; // Default sorting column

  const toggleSortOrder = (columnValue) => {
    const currentSortOrder = sortOrders[columnValue] || "viewKey"; // Default to "desc" if not set
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
        <span  className='mx-2'>
          {TableHeadData?.viewKey}
        </span>
        <div className="filter-block">
       { isOpen  &&  <a  className='filter-icon ' onClick={(e) => { e.stopPropagation(); toggleSortOrder("viewKey"); }}>
            <img src={filter_alt} alt="Filter" />
          </a>}
        </div>
      </div>
      <div className="table-col" onClick={() => onToggle()} >
        <span className='mx-2'>
          {formatNumber(TableHeadData?.numberOfActiveUsers)}
        </span>
    
        { isOpen  &&  <a  className='filter-icon ' onClick={(e) => { e.stopPropagation(); toggleSortOrder("numberOfActiveUsers") }}>
            <img src={filter_alt} alt="Filter" />
          </a>}
    
      </div>
      <div className="table-col" onClick={() => onToggle()}>
  <span className='mx-2' >
    {formatNumber((TableHeadData?.totalWatchHours.toFixed(2)))} Hrs
  </span>
  {isOpen  && <a  className='filter-icon ' onClick={(e) => { e.stopPropagation(); toggleSortOrder("totalWatchHours") }}>
            <img src={filter_alt} alt="Filter" />
          </a>}
</div>

<div className="table-col" onClick={() => onToggle()}>
  <span  className='mx-2'>
    {TimeConverter(TableHeadData?.averageWatchTimePerUser)}
  </span>
 { isOpen  && <a  onClick={(e) => { e.stopPropagation(); toggleSortOrder("averageWatchTimePerUser") }}>
            <img src={filter_alt} alt="Filter" />
          </a>}
</div>

<div className="table-col" onClick={() => onToggle()}>
  <span  className='mx-2'>
    {TimeConverter(TableHeadData?.averageWatchTimePerSession)}
  </span>
 {isOpen  &&  <a   onClick={(e) => { e.stopPropagation(); toggleSortOrder("averageWatchTimePerSession") }}>
            <img src={filter_alt} alt="Filter" />
          </a>}
</div>

{/* <div className="table-col" onClick={() => onToggle()}>
  <span  className='mx-2'>
    {TableHeadData?.totalAdImpression}
  </span>
 {isOpen  &&  <a  onClick={(e) => { e.stopPropagation(); toggleSortOrder("totalAdImpression") }}>
            <img src={filter_alt} alt="Filter" />
          </a>}
</div> */}

    </div>
  );
}

export default AccordionTableHead;
