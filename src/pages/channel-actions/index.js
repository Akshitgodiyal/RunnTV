import React, { useState } from "react";

import "./ChannelActions.scss";
import Dashboardheader from "../../component/dashboard-header";
import SlideBar from "../../component/sidebar/sidebar";
import donecheck from "../../assets/images/donecheck.png";
import pending from "../../assets/images/pending.png";
import error from "../../assets/images/error.png";
import warning from "../../assets/images/warning.png";
import processing from "../../assets/images/processing.png";
import filter_alt from "../../assets/images/sortarrow.png";
import rightArrow from "../../assets/images/rightvector.png";
import leftArrow from "../../assets/images/Vector.png";
import { DateStamp, TimeConverter } from "../../service/commonFunc";
import {AssetPublish, AssetTranscode, AssetValidate, Asset_Detail } from "../../api/api";
import Validatepopup from "../../component/popup/asset-action-popup/Validatepopup";
import { useEffect } from "react";



export default function ChannelActionsComponent() {
  const AssetActionDetail = JSON.parse(localStorage.getItem("AssetDetail"));
  const AssetPartnerDetail = JSON.parse(localStorage.getItem("AssetPartnerDetail"));
  const [actionDetail, setActionDetail] = useState([]);
  const [actionData, setActionData] = useState([]);


  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuerys, setSearchQuery] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const params = {
        partnerId: AssetPartnerDetail?.id,
        pageSize: itemsPerPage,
        pageNumber: currentPage - 1 ,
        ...(searchQuerys ? { searchQuery:searchQuerys } : null)
    };

      try {
        const assetDetail = await Asset_Detail(params);

        if (assetDetail.status === true) {
          localStorage.setItem("AssetDetail", JSON.stringify(assetDetail.data));
          setActionDetail(assetDetail.data?.content);
          setActionData(assetDetail.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [currentPage,searchButtonClicked]);

  const blankValue = (
    <>
      <img src={pending} alt="Error Image" /> pending
    </>
  );
  const processingValue = (
    <>
      <img src={processing} alt="Error Image" /> processing..
    </>
  );
  const errorValue = (
    <>
      <img src={error} alt="Error Image" /> Error Summary
    </>
  );
  const [validatepopup, setvalidatepopup] = useState(false);

  const [transcodeActive, setTranscodeActive] = useState(false);
  const [validateActive, setValidateActive] = useState(false);
  const [publishActive, setPublishActive] = useState(false);
  const [validatedata, setValidate] = useState(null);

  const actionStatus = (status) => {
    if (status === "NOT_DONE" ) {
      return "pending";
    }
    if (status === "ERROR") {
      return "error";
    }

    if (status === "IN_PROGRESS") {
      return "processing ";
    }
    if (status === "DONE") {
      return "complete";
    }
    if (status == null) {
      return "pending ";
    }
  };

  const errorstatus = (status) => {
    
    if (status === "NOT_DONE" ) {
      return blankValue;
    }
    if (status === "ERROR") {
      return errorValue;
    }

    if (status === "IN_PROGRESS") {
      return processingValue;
    }
    if (status === "DONE") {
      return blankValue;
    }
    if (status == null) {
      return blankValue;
    }
  };





  const typeOptions = ["PROGRAM", "PROMOS", "FILLERS"];
  const [selectedType, setSelectedType] = useState("");

  const [checkedIds, setCheckedIds] = useState([]);

  // const handleCheckboxChange = (data) => {
  //   if (data?.transcoded === false) {
  //     setTranscodeActive(true);
  //   } else if (data?.validated === false) {
  //     setValidateActive(true);
  //   } else {
  //     setPublishActive(true);
  //   }

  //   if (checkedIds.includes(data.id)) {
  //     setCheckedIds(checkedIds.filter((id) => id !== data.id));
  //   } else {
  //     setCheckedIds([...checkedIds, data.id]);
  //   }
  // };


const validationaction =async(checkedIds)=>{
  const actionData = {
    //   actionType: actionType,
      assetIds: [checkedIds],
    };
  const validate = await AssetValidate(actionData);
console.log("validate",validate?.data?.data[0]);
setValidate(validate?.data?.data[0])
setvalidatepopup(true)
}






  const AssetActions = async (actionType) => {
    const actionData = {
    //   actionType: actionType,
      assetIds: checkedIds,
    };

   
 if(actionType == "TRANSCODE"){
    const transcode = await AssetTranscode(actionData);
console.log("transcode",transcode);
 }
 else if(actionType == "VALIDATE"){
    const validate = await AssetValidate(actionData);
console.log("validate",validate?.data?.data[0]);
setValidate(validate?.data?.data[0])
setvalidatepopup(true)
 }
 else if(actionType == "PUBLISH"){

    const publish = await AssetPublish(actionData);
 }

};

  const handleSort = async (field) => {
    const sortOrder = field === "filename" ? "asc" : "desc";
    const params = {
      partnerId: AssetPartnerDetail?.id,
      sortBy: field,
      sortOrder: sortOrder,
      pageNumber: currentPage - 1 ,
      pageSize: itemsPerPage,
    };

    const assetDetail = await Asset_Detail(params);

    if (assetDetail.status === true) {
      localStorage.setItem("AssetDetail", JSON.stringify(assetDetail.data));
      setActionDetail(assetDetail.data?.content);
    }
  };

  const handleSearch = () => {
if(searchQuerys !== ""){
    setSearchButtonClicked(true);

}   
  };

  return (
    <div className="content-body">
      <div className="dashboard-content">
        <div className="top-content">
          <div className="left-side">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <a href="#">Asset Management</a>
                </li>
                <li>
                  <a href="#">{AssetPartnerDetail?.name}</a>
                </li>
                <li className="active">Actions</li>
              </ul>
            </div>
          </div>
          <div className="right-side">
          <input
        type="text"
        placeholder="Enter your search query"
        value={searchQuerys}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="action-category">
          <ul>
            <li className={transcodeActive ? "active" : ""}>
              <a onClick={() => AssetActions("TRANSCODE")}>Transcode</a>
            </li>
            <li className={validateActive ? "active" : ""}>
              <a onClick={() => AssetActions("VALIDATE")}>Validate</a>
            </li>
            <li className={publishActive ? "active" : ""}>
              <a onClick={() => AssetActions("PUBLISH")}>Publish</a>
            </li>
          </ul>
        </div>
        <div className="table-checkbox">
          <div className="table">
            <table className="striped-table">
              <thead>
                <tr>
                  <th>
                    <input
                      id="1"
                      type="checkbox"
                      value=""
                      onChange={() => {
                        // Set Transcode active based on checkbox selection
                        setTranscodeActive(true);
                      }}
                    />
                    <label for="1">&nbsp;</label>
                  </th>
                  <th>
                    Program Name{" "}
                    <a className="filter-icon mx-2" onClick={() => handleSort("filename")}>
              <img src={filter_alt} alt="Filter" />
                    </a>
                  </th>
                  <th>
                    Type
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">All Type</option>
                      {typeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>
                    Duration{" "}
                    <a className="filter-icon mx-2" onClick={() => handleSort("duration")}>
              <img src={filter_alt} alt="Filter" />
                    </a>
                    <br /> hh:mm:ss
                  </th>
                  <th>
                    Date Uploaded{" "}
                    <a className="filter-icon mx-2" onClick={() => handleSort("dateUploaded")}>
              <img src={filter_alt} alt="Filter" />
                    </a>
                    <br />
                    dd/mm/yy{" "}
                  </th>
                  <th>
                    Transcode{" "}
                    <a className="filter-icon mx-2" onClick={() => handleSort("dateTranscoded")}>
              <img src={filter_alt} alt="Filter" />
                    </a>
                  </th>
                  <th>
                    VALIDATE{" "}
                    <a className="filter-icon mx-2" onClick={() => handleSort("dateValidated")}>
              <img src={filter_alt} alt="Filter" />
                    </a>
                  </th>
                  <th>
                    PUBLISH{" "}
                    <a className="filter-icon mx-2" onClick={() => handleSort("datePublished")}>
              <img src={filter_alt} alt="Filter" />
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {actionDetail &&
                  actionDetail
                    .filter(
                      (data) =>
                        selectedType === "" || data.videoType === selectedType
                    )
                    .map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "even" : "odd"}
                        >
                          <td>
                            <input
                              id={data.id}
                              type="checkbox"
                              value=""
                              onChange={() => {
                                if (data?.transcoded === false) {
                                  setTranscodeActive(true);
                                } else if (data?.validated === false) {
                                  setValidateActive(true);
                                } else {
                                  setPublishActive(true);
                                }

                                // Update checkedIds based on checkbox status
                                if (checkedIds.includes(data.id)) {
                                  // If the ID is already in the array, remove it (unchecked)
                                  setCheckedIds(
                                    checkedIds.filter((id) => id !== data.id)
                                  );
                                } else {
                                  // If the ID is not in the array, add it (checked)
                                  setCheckedIds([...checkedIds, data.id]);
                                }
                              }}
                            />
                            <label for={data.id}>&nbsp;</label>
                          </td>

                          <td>{data.filename}</td>
                          <td>{data.videoType}</td>
                          <td>{TimeConverter(data.duration)}</td>
                          <td>{DateStamp(data.dateUploaded)}</td>
                          <td>
                            <div
                              className={
                                data?.transcoded === true
                                  ? "complete"
                                  : actionStatus(data?.transcodingStatus)
                              }
                            >
                              {data.transcoded !== true  
                                ? errorstatus(data?.transcodingStatus)
                                : DateStamp(data.dateTranscoded)}
                            </div>
                          </td>
                          <td>
                            <div
                            onClick={()=>{data?.validationStatus == "ERROR" && validationaction(data.id)}}
                              className={
                                data?.transcoded === true
                                  ? data?.validated === true
                                    ? "complete"
                                    : actionStatus(data?.validationStatus)
                                  : "pending"
                              }
                            >
                              {data?.validated !== true
                                ?   errorstatus(data?.validationStatus)
                                : DateStamp(data.dateValidated)}
                            </div>
                          </td>
                          <td>
                            <div
                              className={
                                data?.validated === true
                                  ? "complete"
                                  : "pending"
                              }
                            >
                              {data.datePublished === null
                                ? blankValue
                                : DateStamp(data.datePublished)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <div className="table-pagination">
            <div className="pagination-count">
              <div className="count">
                {`${Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  actionData.totalElements
                )}-${Math.min(currentPage * itemsPerPage, actionData.totalElements)} of ${actionData.totalElements}`}
              </div>
              <div className="pagination-arrow">
                <a
                  className="prev"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                  <img src={leftArrow} alt="Previous" />
                </a>
                <a
                  className="next"
                  onClick={() =>
                    currentPage < actionData.totalPages && setCurrentPage(currentPage + 1)
                  }
                >
                  <img src={rightArrow} alt="Next" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {validatepopup &&
      <Validatepopup handleClosePopup={()=>setvalidatepopup(false)} validateinfo={validatedata} />
       } </div>
  );
}
