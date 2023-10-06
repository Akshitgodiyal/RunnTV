import React,{useState} from 'react'
import SlideBar from '../../component/sidebar/sidebar'
import DashboardHeader from '../../component/dashboard-header'
import editoutline from "../../assets/images/edit-outline.svg"
import currentDatas from "../../dummyjson/channelList.json"
import "./scheduling.scss"
import rightarrow  from "../../assets/images/rightvector.png"
import leftarrow  from "../../assets/images/Vector.png"
function Scheduling() {
    const pageSize = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
  
  
  
    const totalPages = Math.ceil(currentDatas.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = currentDatas.slice(startIndex, endIndex);
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };


  
  return (

      <div className="content-body">
        <div className="dashboard-content">
          <div className="top-content">
            <div className="left-side">
              <h3>Scheduling</h3>
            </div>
          </div>
          <div className="channel-form">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Search by channel name" />
                <button type="submit">
                  <img src="./assets/images/ic_round-search.svg" alt="" />
                </button>
              </div>
            </form>
          </div>
          <div className="table table-striped">
            <table>
              <thead>
                <tr>
                  <th width="50%">Channel Name</th>
                  <th>Status</th>
                  <th width="5%"></th>
                </tr>
              </thead>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{`${item.isActive}`}</td>
                  <td>
                    <a href="#" className="edit-icon">
                      <img src={editoutline} alt="" />
                    </a>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className="table-pagination">
            <div className="pagination-count">
              <div className="count">
                {startIndex + 1}-{Math.min(endIndex, currentDatas.length)} of {currentDatas.length}
              </div>
              <div className="pagination-arrow">
                <a onClick={handlePrevPage} className="prev" >  <img src={leftarrow} alt="leftarrow" /></a>
                <a onClick={handleNextPage} className="next" >  <img src={rightarrow} alt="rightarrow" /></a>
              </div>
            </div>
          </div>
        </div>
      

  </div>
  )
}

export default Scheduling