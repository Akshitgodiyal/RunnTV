import React, { useState } from "react";
import "./validatepop.scss"; // Import the CSS file
import folder from "../../../assets/images/floder-open.png";
import donecheck from "../../../assets/images/donecheck.png";
import pending from "../../../assets/images/pending.png";
import error from "../../../assets/images/error.png";
import warning from "../../../assets/images/warning.png";
import processing from "../../../assets/images/processing.png";


function Validatepopup({validateinfo, handleClosePopup}) {


console.log(validateinfo);


  const [filetranscoded, setFileTranscoded] = useState(validateinfo?.transcoded);
  const [Postersvalidation, setPostersValidation] = useState(validateinfo?.missingPosters);
  const [metadatavalidation, setMetadataValidation] = useState(validateinfo?.missingMetadataFields);




  return (

    <div className="validate">
      <div className="validation-container">
        <div className="validation-text">Validating</div>
        <div className="episode-text">Video 1 : Episode 1</div>
        <div className="file-section border-bottom ">
          <div className="videos-header d-flex justify-content-between">
            <div>

              <img src={folder} style={{ width: "20px" }} />
              <span className="videos-label p-2">Videos</span>
            </div>

            <div className="status-icon">
              <div className="status-icon-shape">
                {filetranscoded ? <img src={donecheck} style={{ height: "20px" }} /> : <img src={error} style={{ height: "20px" }} />}
              </div>
            </div>
          </div>
          <div className="videos-status">
            <div className="status-text">

              {filetranscoded ?
                "Video is transcoded" : "file is not transcoded"}
            </div>
          </div>
        </div>
        <div className="file-section border-bottom ">
          <div className="videos-header d-flex justify-content-between">
            <div>

              <img src={folder} style={{ width: "20px" }} />
              <span className="videos-label p-2">Posters</span>
            </div>

            <div className="status-icon">
              <div className="status-icon-shape">
            { Postersvalidation && Postersvalidation.length == 0 ?  <img src={donecheck} style={{ height: "20px" }} />: <img src={error} style={{ height: "20px" }} />
            
          }
              </div>
            </div>
          </div>
          <div className="videos-status">
            <div className="status-text">
              Missing : {Postersvalidation && Postersvalidation.map((data) =>
                <span className="mx-2">{ data} </span>)}
            </div>
            </div>
          </div>
          <div className="file-section  ">
            <div className="videos-header d-flex justify-content-between">
              <div>

                <img src={folder} style={{ width: "20px" }} />
                <span className="videos-label p-2">Metadata</span>
              </div>

              <div className="status-icon">
                <div className="status-icon-shape">
                { metadatavalidation && metadatavalidation.length == 0 ?  <img src={donecheck} style={{ height: "20px" }} />: <img src={error} style={{ height: "20px" }} />
            
          }
                </div>
              </div>
            </div>
            <div className="videos-status">
              <div className="status-text">
                Missing : {metadatavalidation && metadatavalidation.map((data) =>
                  <span className="mx-2"> {data }</span>)
                  
                  
                  }


              </div>
            </div>
          </div>

          <div className="cancel-button">
            <div className="cancel-text" onClick={()=>handleClosePopup()}>Cancel</div>
          </div>
          <div className="done-button">
            <div className="done-text">Done</div>
          </div>
        </div>
      </div>
      )

}

      export default Validatepopup;
