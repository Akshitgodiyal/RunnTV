import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for routing
import "./CmsChannelDetail.scss";
import removefile from "../../../assets/images/remove-file.svg";
import icroundsearch from "../../../assets/images/ic_round-search.svg";
import viewlist from "../../../assets/images/view_list.svg";
import view_module from "../../../assets/images/view_module.svg";
import video_icon from "../../../assets/images/video-icon.png";
import uploadicon from "../../../assets/images/uploadicon.png";
import deleteicon from "../../../assets/images/deleteicon.png";
import FileUpload from "../../../component/popup/FileUpload";
import { CMS_Uplaod } from "../../../service/API_URL";
import instance from "../../../service/axiosConfig";
import { Asset_Delete, Asset_Detail } from "../../../api/api";



function CmsChannelDetail() {

  // const someValue = useSelector(state => state);
  const assetData = JSON.parse(localStorage.getItem("AssetDetail"));
  const AssetPartnerDetail = JSON.parse(localStorage.getItem("AssetPartnerDetail"));
// console.log("assetData.content",assetData.content);

  const [contentArray, setContentArray] = useState(assetData.content);
  const [activeTab, setActiveTab] = useState("PROGRAM");
  const [categoryTab, setCategoryTab] = useState("VIDEO");



  const handleFileChange = async (e) => {
    const params = {
      partnerId: AssetPartnerDetail?.id,
      assetType: categoryTab,
      videoType: categoryTab === "VIDEO" ? activeTab : null,
      metadataType:"MOVIES"
    }

    const URL = CMS_Uplaod;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await instance.post(URL, formData, {
        params, // Include query parameters here
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );

        },

      }

     

      );

    
      assetdetail(AssetPartnerDetail)
    
    }catch (error) {
      console.log(error);
    }
  }





  const programVideos = contentArray?.filter(
    (item) => item.assetType === "VIDEO" && item.videoType === "PROGRAM"
  );
  const promosVideos = contentArray.filter(
    (item) => item.assetType === "VIDEO" && item.videoType === "PROMOS"
  );
  const fillersVideos = contentArray.filter(
    (item) => item.assetType === "VIDEO" && item.videoType === "FILLERS"
  );
  const PostersData = contentArray.filter(
    (item) => item.assetType === "POSTERS"
  );
  const SecondaryData = contentArray.filter(
    (item) => item.assetType === "SECONDARY"
  );
  const MetafileData = contentArray.filter(
    (item) => item.assetType === "METAFILE"
  );



  // console.log("Selected file:", programVideos);
  const handlecategoryTab = (tab) => {
    setCategoryTab(tab);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const assetdelete = async (assetid) => {
 
    const deleteasset = await Asset_Delete(assetid);
// console.log(deleteasset);
assetdetail(AssetPartnerDetail)
  }
  const assetdetail = async (AssetPartnerDetail) => {
    // console.log("asdfghjkl",AssetPartnerDetail);
    const params = {
      partnerId: AssetPartnerDetail?.id,
    };

    const AssetDetail = await Asset_Detail(params);

    if (AssetDetail.status == true) {
      // console.log(AssetDetail.status == true);
      localStorage.setItem("AssetDetail", JSON.stringify(AssetDetail?.data));
  
      setContentArray(JSON.parse(localStorage.getItem("AssetDetail"))?.content)
    }
    // dispatch(AssetDetailAction(AssetDetail?.data))
  };


  return (
    <div className="content-body">
      <div className="dashboard-content">
        <div className="top-content">
          <div className="left-side">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <a >Asset Management</a>
                </li>
                <li className="active">{AssetPartnerDetail?.name}</li>
              </ul>
            </div>
          </div>
          <div className="right-side">
            <div className="icon-list">
              <div className="search-icon">
                <a href="javascript:void(0)" className="icon">
                  <img src={icroundsearch} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="channel-category ">
          <ul >
            <li className={categoryTab === "VIDEO" ? "active" : ""}>
              <a onClick={() => handlecategoryTab("VIDEO")}>
                Video
              </a>
            </li>
            <li className={categoryTab === "POSTERS" ? "active" : ""}>
              <a onClick={() => handlecategoryTab("POSTERS")}>
                Posters
              </a>
            </li>
            <li className={categoryTab === "SECONDARY" ? "active" : ""}>
              <a onClick={() => handlecategoryTab("SECONDARY")}>
                Secondary
              </a>
            </li>
            <li className={categoryTab === "METAFILE" ? "active" : ""}>
              <a onClick={() => handlecategoryTab("METAFILE")}>
                Metafile
              </a>
            </li>

            <button to="/channel-actions" className="btn btn-light-red-ml-auto">
              Actions
            </button>
          </ul>
        </div>

        {categoryTab === "VIDEO" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side">
                <ul className="tabs">
                  <li
                    className={`tab-a ${activeTab === "PROGRAM" ? "active" : ""}`}
                    onClick={() => handleTabClick("PROGRAM")}
                  >
                    Program
                  </li>
                  <li
                    className={`tab-a ${activeTab === "PROMOS" ? "active" : ""}`}
                    onClick={() => handleTabClick("PROMOS")}
                  >
                    Promos
                  </li>
                  <li
                    className={`tab-a ${activeTab === "FILLERS" ? "active" : ""}`}
                    onClick={() => handleTabClick("FILLERS")}
                  >
                    Fillers
                  </li>
                </ul>
              </div>
              <div className="right-side">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <a
                  className="mx-2"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <img src={uploadicon} />
                </a>

                {/* <a  className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a> */}
              </div>
            </div>
            <div className="content-wrapper">
              <div
                id="tab-1"
                className={`tab-content ${activeTab === "PROGRAM" ? "active" : ""}`}
              >
                <div class="video-channel-list">
                  {programVideos &&
                    programVideos.map((data) => {
                      return (
                        <div class="block">
                          <button  onClick={()=>assetdelete(data.id)} className="delete-button"><img src={deleteicon}/></button>
                          <img src={video_icon} alt="" />
                          <label>{data.filename}</label>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div
                id="tab-2"
                className={`tab-content ${activeTab === "PROMOS" ? "active" : ""}`}
              >
                {promosVideos &&
                  promosVideos.map(() => {
                    return (
                      <div class="block">
                        <img src={video_icon} alt="" />
                        <label>Video 1</label>
                      </div>
                    );
                  })}
              </div>
              <div
                id="tab-3"
                className={`tab-content ${activeTab === "FILLERS" ? "active" : ""}`}
              >
                {fillersVideos &&
                  fillersVideos.map(() => {
                    return (
                      <div class="block">
                        <img src={video_icon} alt="" />
                        <label>Video 1</label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        {categoryTab === "POSTERS" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side"></div>
              <div className="right-side">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e,)}
                />
                <a
                  className="mx-2"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <img src={uploadicon} />
                </a>
                {/* <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a  className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a> */}
              </div>
            </div>
            <div className="content-wrapper">
              <div class="video-channel-list">
                {PostersData &&
                  PostersData.map(() => {
                    return (
                      <div class="block">
                        <img src={video_icon} alt="" />
                        <label>Video 1</label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        {categoryTab === "SECONDARY" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side"></div>
              <div className="right-side">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <a
                  className="mx-2"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <img src={uploadicon} />
                </a>
                {/* <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a  className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a> */}
              </div>
            </div>
            <div className="content-wrapper">
              <div class="video-channel-list">
                {SecondaryData &&
                  SecondaryData.map(() => {
                    return (
                      <div class="block">
                        <img src={video_icon} alt="" />
                        <label>Video 1</label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        {categoryTab === "METAFILE" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side"></div>
              <div className="right-side">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <a
                  className="mx-2"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <img src={uploadicon} />
                </a>
                {/* <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a  className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a> */}
              </div>
            </div>
            <div class="video-channel-list">
              {MetafileData &&
                MetafileData.map((data) => {
                  return (
                    <div class="block">
                      <img src={video_icon} alt="" />
                      <label>Video 1</label>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CmsChannelDetail;
