import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for routing
import "./CmsChannelDetail.scss";
import removefile from "../../../assets/images/remove-file.svg";
import icroundsearch from "../../../assets/images/ic_round-search.svg";
import viewlist from "../../../assets/images/view_list.svg";
import view_module from "../../../assets/images/view_module.svg";
import video_icon from "../../../assets/images/video-icon.png";
import FileUpload from "../../../component/popup/FileUpload";
import { CMS_Uplaod } from "../../../service/API_URL";
import instance from "../../../service/axiosConfig";
const datas = {
  status: true,
  message: "Data fetched successfully",
  data: {
    content: [
      {
        createdAt: 1697691378924,
        updatedAt: 1697694621067,
        id: 1,
        jobId: "1697694620795-8ombxj",
        assetType: "VIDEO",
        videoType: "PROGRAM",
        filename: "21mb-tree.mp4",
        fileSize: 21657943,
        objectKey: "partners/PKTFLM/video/program/source/21mb-tree.mp4",
        duration: 10,
        dateUploaded: 1697691378921,
        dateTranscoded: null,
        transcoded: false,
        validated: false,
        active: false,
        deleted: false,
        partner: {
          createdAt: 1697690890552,
          updatedAt: 1697690890552,
          id: 1,
          code: "PKTFLM",
          name: "Pocket Films",
          archived: false,
          deleted: false,
          industry: "Entertainment",
          sponsorshipType: "Temorary",
          startDate: 1697690843000,
          endDate: 1702961243000,
          programsCount: null,
          postersCount: null,
          promosCount: null,
          fillersCount: null,
          transcodeCount: null,
          validateCount: null,
          publishCount: null,
        },
      },
      {
        createdAt: 1697694441301,
        updatedAt: 1697694621423,
        id: 2,
        jobId: "1697694621203-uu5fe5",
        assetType: "VIDEO",
        videoType: "PROGRAM",
        filename: "earth-10mb.mp4",
        fileSize: 9840497,
        objectKey: "partners/PKTFLM/video/program/source/earth-10mb.mp4",
        duration: 10,
        dateUploaded: 1697694441297,
        dateTranscoded: null,
        transcoded: false,
        validated: false,
        active: false,
        deleted: false,
        partner: {
          createdAt: 1697690890552,
          updatedAt: 1697690890552,
          id: 1,
          code: "PKTFLM",
          name: "Pocket Films",
          archived: false,
          deleted: false,
          industry: "Entertainment",
          sponsorshipType: "Temorary",
          startDate: 1697690843000,
          endDate: 1702961243000,
          programsCount: null,
          postersCount: null,
          promosCount: null,
          fillersCount: null,
          transcodeCount: null,
          validateCount: null,
          publishCount: null,
        },
      },
    ],
    pageable: {
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 2,
    size: 10,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    numberOfElements: 2,
    empty: false,
  },
};
const handleFileChange = async(e) => {
  const URL = CMS_Uplaod;
  const file = e.target.files[0];
  const formData = new FormData();
      formData.append('file', file);
  if (file) {
  
    // You can perform further actions with the selected file, like uploading it to a server.
  }
  const params = {
    partnerCode: 'AAJTAK',
    assetType: 'VIDEO',
    videoType: 'PROGRAM',
  };

  const response = await instance.post(URL, formData, {
    params, // Include query parameters here
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      console.log();
    },
  });


  console.log('Selected file:', response);




};
function CmsChannelDetail() {

  const contentArray = datas.data.content;

  const programVideos = contentArray.filter(
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


  const [activeTab, setActiveTab] = useState(1);
  const [categoryTab, setCategoryTab] = useState("video");
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const handlecategoryTab = (tab) => {
    setCategoryTab(tab);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUpload = (files) => {
    // Handle file upload in Component A
    console.log("Uploaded files in Component A:", files);
  };

  const openFileUpload = () => {
    setIsFileUploadOpen(true);
  };

  const closeFileUpload = () => {
    setIsFileUploadOpen(false);
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
                <li className="active">Asset Channel number 1</li>
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

        <div className="channel-category">
          <ul>
            <li className={categoryTab === "video" ? "active" : ""}>
              <a href="#" onClick={() => handlecategoryTab("video")}>
                Video
              </a>
            </li>
            <li className={categoryTab === "posters" ? "active" : ""}>
              <a href="#" onClick={() => handlecategoryTab("posters")}>
                Posters
              </a>
            </li>
            <li className={categoryTab === "secondary" ? "active" : ""}>
              <a href="#" onClick={() => handlecategoryTab("secondary")}>
                Secondary
              </a>
            </li>
            <li className={categoryTab === "metafile" ? "active" : ""}>
              <a href="#" onClick={() => handlecategoryTab("metafile")}>
                Metafile
              </a>
            </li>
          </ul>
        </div>

        {categoryTab === "video" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side">
                <ul className="tabs">
                  <li
                    className={`tab-a ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => handleTabClick(1)}
                  >
                    Program
                  </li>
                  <li
                    className={`tab-a ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => handleTabClick(2)}
                  >
                    Promos
                  </li>
                  <li
                    className={`tab-a ${activeTab === 3 ? "active" : ""}`}
                    onClick={() => handleTabClick(3)}
                  >
                    Fillers
                  </li>
                </ul>
              </div>
              <div className="right-side">
              <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e)=>handleFileChange(e)}
      />
                <a className="btn btn-red"  onClick={() => document.getElementById('fileInput').click()}>
                  Upload
                </a>
                <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a href="#" className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a>
              </div>
            </div>
            <div className="content-wrapper">
              <div
                id="tab-1"
                className={`tab-content ${activeTab === 1 ? "active" : ""}`}
              >
                <div class="video-channel-list">
                  {programVideos &&
                    programVideos.map(() => {
                      return (
                        <div class="block">
                          <img src={video_icon} alt="" />
                          <label>Video 1</label>
                        </div>
                      );
                    })}

                 
                </div>
              </div>
              <div
                id="tab-2"
                className={`tab-content ${activeTab === 2 ? "active" : ""}`}
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
                className={`tab-content ${activeTab === 3 ? "active" : ""}`}
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
        {categoryTab === "posters" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side"></div>
              <div className="right-side">
                <a className="btn btn-red" onClick={openFileUpload}>
                  Upload
                </a>
                <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a href="#" className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a>
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
        {categoryTab === "secondary" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side"></div>
              <div className="right-side">
                <a className="btn btn-red" onClick={openFileUpload}>
                  Upload
                </a>
                <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a href="#" className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a>
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
        {categoryTab === "metafile" && (
          <div className="channel-content">
            <div className="channel-top">
              <div className="left-side"></div>
              <div className="right-side">
                <a className="btn btn-red" onClick={openFileUpload}>
                  Upload
                </a>
                <Link to="/channel-actions" className="btn btn-light-red">
                  Actions
                </Link>
                <a href="#" className="btn btn-icon">
                  <img src={removefile} alt="" />
                </a>
              </div>
            </div>
            <div class="video-channel-list">
             {MetafileData &&
                 MetafileData.map(() => {
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
        {isFileUploadOpen && (
          <FileUpload
            onUpload={handleUpload}
            acceptedFormats={[".pdf", ".doc"]}
            onClose={closeFileUpload}
          />
        )}
      </div>
    </div>
  );
}

export default CmsChannelDetail;
