import React, { useEffect, useState } from "react";
import "./vieweship.scss";
import ActiveUser from "../../component/active-user";
import DashboardHeader from "../../component/dashboard-header";
import AccordionBlock from "./accordian/AccordionBlock";
import AccordionFilter from "./accordian/AccordionFilter";
import Tablejson from "../../dummyjson/Tabllehead.json";
import { useDispatch } from "react-redux";
import { ChannelDataAction, MapDataAction } from "../../Redux/slices";

import { ViewershipMap, ViewershipTableChild, ViewershipTablehead } from "../../api/api";
import { TimeConverter, capitalizeFirstLetter } from "../../service/commonFunc";

import filter_alt from "../../assets/images/sortarrow.png";

function Viewership() {
  const [openIndex, setOpenIndex] = useState(null);
  const [TableHead, setTableHead] = useState([]);
  const [filterVal, setFilterVal] = useState({});
  const [sortOrders, setSortOrders] = useState({}); // Store sorting orders for each column
  const [headeFilter, setheadeFilter] = useState({sort: "asc",key: ""}); 
  const [TotalHeader, setTotalHeader] = useState( {"viewType": "HEADER",
  "viewKey": "Average",
  "numberOfActiveUsers": 4,
  "totalWatchHours": 0,
  "averageWatchTimePerUser": 0,
  "averageWatchTimePerSession": 0,
  "totalAdImpression": 0});
  // Store sorting orders for each column
  // Function to toggle the visibility of the inner content
  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the currently open block if clicked again
    } else {
      setOpenIndex(index); // Open the clicked block
    }
   if(openIndex === index){
    
    filterChangeData(filterVal.viewType , filterVal.duration)
   } 
  };
  const allAccordionBlocksClosed = openIndex === null;

  // const accordionData = Tablejson?.TableHead

  const dispatch = useDispatch();

  //on page laod show Total channel data

  const filterChangeData = async (view, duration) => {

   

    // console.log("tablehead124", TableHead,view,duration);

    const ViewershipTableheadData = {
      viewType: view.toUpperCase(),
      duration: duration.toUpperCase(),
      sortOrder: headeFilter.sort,
      ...(headeFilter.key !== "" ? { sortBy: headeFilter.key } : null)
    };

    const data = await ViewershipTablehead(ViewershipTableheadData);

    
    setTableHead(data?.data.data.rows)
   
    mapRenderData(data?.data.data?.header.viewKey)
    setTotalHeader(data?.data.data?.header)

    if(filterVal.duration == duration.toUpperCase()){
      setOpenIndex(null);
      dispatch(ChannelDataAction(data?.data.data?.header));
      // console.log("filte",  filterVal.duration,  duration.toUpperCase());


}
    let filterObj = {
      viewType: view.toUpperCase(),
      duration: duration.toUpperCase(),
    };
    setFilterVal(filterObj);

  };


  const mapRenderData = async (key) => {
 
    const ViewershipMapData = {
      
      channelName: key,
      allChannels: true
      
    };
   
    const MapData = await ViewershipMap(ViewershipMapData);
    
    if(MapData?.data){
      // console.log("mapRenderData",MapData);
   dispatch(MapDataAction(MapData?.data));
   }
  };



  const defaultSortColumn = "showName"; // Default sorting column

  const sortOrderEvent = (columnValue) => {
    const currentSortOrder = sortOrders[columnValue] || ""; // Default to "desc" if not set
    const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

    // Update the sorting order for the clicked column
    setSortOrders({ ...sortOrders, [columnValue]: newSortOrder });
    setheadeFilter({
      sort: newSortOrder,
      key: columnValue,
    })
    
    filterChangeData(filterVal.viewType , filterVal.duration)
  };
 






  return (
    <>
      <DashboardHeader />
      <div className="deshboard-content">
        <div className="title">
          <h2>Viewership </h2>
        </div>
        <AccordionFilter handleChange={filterChangeData} />

        <div className="channel-container">
          <div className="channel-table">
            <div className="channel-table-header">
              <div className="table-row  head" >
                <div className="table-header-col name" >
                  {capitalizeFirstLetter(filterVal.viewType)} Name

            
          <a  className='filter-icon mx-2' onClick={()=>sortOrderEvent("viewType")}>
            <img src={filter_alt} alt="Filter" />
          </a>


                </div>
                <div className="table-header-col">Active Users
                <a  className='filter-icon mx-2' onClick={()=>sortOrderEvent("numberOfActiveUsers")}>
            <img src={filter_alt} alt="Filter" />
          </a>
                
                </div>
                <div className="table-header-col">Total Watch Hours
                <a  className='filter-icon mx-2'onClick={()=>sortOrderEvent("totalWatchHours")}>
            <img src={filter_alt} alt="Filter" />
          </a>
                </div>
                <div className="table-header-col">
                  Avg - Watch Time<a  className='filter-icon mx-2'onClick={()=>sortOrderEvent("averageWatchTimePerUser")}>
            <img src={filter_alt} alt="Filter" />
          </a> Per User  
                  <br />
                  <small>(HH:MM:SS)</small>
                
                </div>
                <div className="table-header-col"onClick={()=>sortOrderEvent("averageWatchTimePerSession")}>
                  Avg - Watch Time <a  className='filter-icon mx-2'onClick={()=>sortOrderEvent("averageWatchTimePerSession")}>
            <img src={filter_alt} alt="Filter" />
          </a> Per Session  <br />
                  <small>(HH:MM:SS)</small>
                
                </div>
                <div className="table-header-col"onClick={()=>sortOrderEvent("totalAdImpression")}>Total Ad Impression
                <a  className='filter-icon mx-2'onClick={()=>sortOrderEvent("totalAdImpression")}>
            <img src={filter_alt} alt="Filter" />
          </a>
                </div>
              </div>
            </div>

            <div
              onClick={() => filterChangeData(filterVal.viewType , filterVal.duration)}
              className="channel-table-header"
            >
              <div className="table-row">
                <div className="table-header-col name">
                  All {capitalizeFirstLetter(filterVal.viewType)}s
                </div>
                <div className="table-header-col">{TotalHeader?.numberOfActiveUsers}</div>
                <div className="table-header-col">{TotalHeader?.totalWatchHours.toFixed(2)} Hrs</div>
                <div className="table-header-col">
                {TimeConverter(TotalHeader?.averageWatchTimePerUser)}
                  <br />
            
                </div>
                <div className="table-header-col">
                {TimeConverter(TotalHeader?.averageWatchTimePerSession)}
              
                </div>
                <div className="table-header-col">{TotalHeader?.totalAdImpression}</div>
              </div>
            </div>

            <div className="channel-table-body">
              <div className="channel-accordion">
                {TableHead &&
                  TableHead?.map((data, index) => (
                    <AccordionBlock
                      key={index}
                      title={data}
                      closeaccodian ={()=>filterChangeData(filterVal.viewType , filterVal.duration)}
                 
                      isOpen={index === openIndex}
                      onToggle={() => toggleAccordion(index)}
                      filter={filterVal}
                    
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="active-user-section">
            <ActiveUser />
            {/* <div style={{position:"absolute", top:"20%"}}>
            <MyCalendar />
    </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewership;
