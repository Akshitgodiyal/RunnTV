import React, { useState, useEffect } from "react";
import { ViewershipMap, ViewershipTableChild } from "../../../api/api";
import { useDispatch } from "react-redux";
import { ChannelDataAction, MapDataAction } from "../../../Redux/slices";
import { TimeConverter } from "../../../service/commonFunc";

function AccordionChild({ data, filter, clickedData }) {
  const [programData, setProgramData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalShowLength, setTotalShowLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
 
  // Update the API call parameters when currentPage or itemsPerPage change
  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;
    const ViewershipTableChildData = {
      viewType: filter?.viewType,
      viewKey: data?.viewKey,
      duration: filter?.duration,
      offset,
      limit,
      sortBy: clickedData?.key,
      sortOrder: clickedData?.sort
    };
    // console.log("hello", clickedData );
    (async () => {
      const childdata = await ViewershipTableChild(ViewershipTableChildData);
      setProgramData(childdata?.data.data.rows);
      setTotalShowLength(childdata?.data.data.totalResults);
    })();

if(filter?.viewType == "CHANNEL"){
  console.log("SAS",filter?.viewType);
  mapRenderData()

}

    

  }, [currentPage, itemsPerPage, data, filter, clickedData]);


  
  const mapRenderData = async () => {
 
    
    const ViewershipMapData = {
      
      channelName: data?.viewKey
      
      
    };
    
    const MapData = await ViewershipMap(ViewershipMapData);
    
    if(MapData.data.success == true){
      dispatch(ChannelDataAction(data));
   dispatch(MapDataAction(MapData?.data));
   }
  };




  useEffect(() => {

  

    // Calculate the maximum selectable value in intervals of 10
    const maxSelectableValue = Math.ceil(totalShowLength / itemsPerPage) * itemsPerPage;

    // Generate the dynamic options array based on maxSelectableValue
    const newOptions = [...Array(maxSelectableValue / itemsPerPage)].map(
      (_, index) => (index + 1) * itemsPerPage
    );

    setOptions(newOptions);
  }, [totalShowLength]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset currentPage to 1 when changing the number of items per page
  };

  const totalPages = Math.ceil(totalShowLength / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 3; // Maximum number of visible buttons

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= maxVisibleButtons - 1) {
        for (let i = 1; i <= maxVisibleButtons; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="ellipsis1">...</span>);
        buttons.push(
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - (maxVisibleButtons - 2)) {
        buttons.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        buttons.push(<span key="ellipsis1">...</span>);
        for (let i = totalPages - (maxVisibleButtons - 2); i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        buttons.push(<span key="ellipsis1">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="ellipsis2">...</span>);
        buttons.push(
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  const showPagination = totalShowLength > itemsPerPage;

  return (
    <div className="inner">

      <div className="table-content">
        {programData.map((data, index) => (
          <div key={index} className="table-row">
            <div className="table-col name">{data.showName}</div>
            <div className="table-col">{data.numberOfActiveUsers}</div>
            <div className="table-col">{data.totalWatchHours.toFixed(2)}</div>
            <div className="table-col">{TimeConverter(data.averageWatchTimePerUser)}</div>
            <div className="table-col">{TimeConverter(data.averageWatchTimePerSession)}</div>
            <div className="table-col">{data.totalAdImpression}</div>
          </div>
        ))}
      </div>
      {showPagination && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <div className="items-per-page">
            <label>Show items per page:</label>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={totalShowLength}>All</option>
            </select>
          </div>
        </div>
      )}

    </div>
  );
}

export default AccordionChild;
