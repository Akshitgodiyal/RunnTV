import React from 'react'

import "./ChannelActions.scss"
import Dashboardheader from '../../component/dashboard-header'
import SlideBar from '../../component/sidebar/sidebar'



export default function Channelactionscomponent() {
  return (
    <>
    <Dashboardheader />
    <div className="main-content">
      <SlideBar />
        <div className="content-body">
            <div className="dashboard-content">
                <div className="top-content">
                    <div className="left-side">
                        <div className="breadcrumbs">
                            <ul>
                                <li><a href="#">Asset Management</a></li>
                                <li><a href="#">Asset Channel number 1</a></li>
                                <li className="active">Actions</li>
                            </ul>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="icon-list">
                            <div className="search-icon">
                                <a className="icon">
                                    <img src="./assets/images/ic_round-search.svg" alt="" />
                                </a>
                            </div> 
                            <div className="view-list">
                                <a className="grid-icon icon active">
                                    <img src="./assets/images/view_module.svg" alt="" />
                                </a>
                                <a className="list-icon icon">
                                    <img src="./assets/images/view_list.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="action-category">
                    <ul>
                        <li className="active"><a href="#">Transcode</a></li>
                        <li><a href="#">Validate</a></li>
                        <li><a href="#">Publish</a></li> 
                    </ul>
                </div> 
           <div className="table-checkbox">
           <div className="table ">
                    <table>
                        <thead>
                            <tr>
                                <th> 
                                    <input id="1" type="checkbox" value="" />
                                    <label for="1">&nbsp;</label>
                                </th>
                                <th>Video File Name</th>
                                <th>Duration <br/> hh:mm:ss</th>
                                <th>STATUS</th>
                                <th>Date Uploaded<br/>dd/mm/yy </th>
                                <th>Date Transcode<br/>dd/mm/yy </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input id="2" type="checkbox" value="" />
                                    <label for="2">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr>
                            <tr className="active">
                                <td>
                                    <input id="3" type="checkbox" value="" />
                                    <label for="3">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr> 
                            <tr>
                                <td>
                                    <input id="4" type="checkbox" value="" />
                                    <label for="4">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr> 
                            <tr>
                                <td>
                                    <input id="2" type="checkbox" value="" />
                                    <label for="2">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr> 
                            <tr>
                                <td>
                                    <input id="2" type="checkbox" value="" />
                                    <label for="2">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr> 
                            <tr>
                                <td>
                                    <input id="2" type="checkbox" value="" />
                                    <label for="2">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr> 
                            <tr>
                                <td>
                                    <input id="2" type="checkbox" value="" />
                                    <label for="2">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr> 
                            <tr>
                                <td>
                                    <input id="2" type="checkbox" value="" />
                                    <label for="2">&nbsp;</label>
                                </td>
                                <td>
                                    Video 1 : Episode 1  
                                </td>
                                <td>02:30:45</td>
                                <td>Transcoded and Validated</td>
                                <td>10/01/2022</td>
                                <td>20/02/2022</td>
                                <td><a href=""><img src="./assets/images/delete_forever.png" alt=""/></a></td>
                            </tr>  
                        </tbody>
                    </table>
               
            </div>
                <div className="table-pagination">
                    <div className="pagination-count">
                        <div className="count">
                            1-6 of 6
                        </div>
                        <div className="pagination-arrow">
                            <a href="#" className="prev"><img src="./assets/images/arrow-prev.svg"/></a>
                            <a href="#" className="next"><img src="./assets/images/arrow-next.svg"/></a>
                        </div>
                    </div>
                </div>
           </div >
       
            </div>  
           
        </div> 
    </div>
    </>
    
  )
}
