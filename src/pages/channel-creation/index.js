import React from 'react'
import DashboardHeader from '../../component/dashboard-header'
import asseticon from "../../assets/images/asset-icon.svg"
import channelicon from "../../assets/images/channel-icon.svg"
import Engineicon from "../../assets/images/Engine-icon.svg"
import schedulingicon from "../../assets/images/scheduling-icon.svg"
import managementicon from "../../assets/images/management-icon.svg"
export default function channelCreationComponent() {
  return (
    <>
<DashboardHeader />
<div class="sidebar-menu">
      <div class="back-menu">
          <a href="javascript:void(0)"><img src="./assets/images/back-icon.svg"/></a>
      </div>
      <div class="menu">
          <ul>
              <li class="active">
                  <a ><img src={asseticon} /><span>Asset Management</span></a>
              </li>
              <li>
                  <a ><img src={channelicon} /><span>Channel Setup</span></a>
              </li>
              <li>
                  <a ><img src={Engineicon} /><span>Rule Engine</span></a>
              </li>
              <li>
                  <a ><img src={schedulingicon} /><span>Scheduling</span></a>
              </li>
              <li>
                  <a ><img src={managementicon} /><span>Inventory Management</span></a>
              </li>
          </ul>
      </div>
  </div>
    
    </>
  )
}
