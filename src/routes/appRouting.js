import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ForgetPassword from '../pages/forgotpassword';
import Login from '../pages/Login';
import ResetPassword from '../pages/reset-password';
import Channelactionscomponent from '../pages/channel-actions';
import Viewership from '../pages/viewership';
import Scheduling from '../pages/Scheduling';
import Cmsdashboard from '../pages/cms-dashboad';
import CmsLayout from '../Layout/CmsLayout';
// import AssetManagement from "../pages/asset-management"
import CmsChannelDetail from '../pages/asset-management/channeldetail/CmsChannelDetail';
// import ViewershipComponent from './ViewershipComponent';
// import DashboardComponent from './DashboardComponent';
// import DashbordChannelComponent from './DashbordChannelComponent';
// import ChannelActionsComponent from './ChannelActionsComponent';
// import SchedulingComponent from './SchedulingComponent';
// import ChannelSetupComponent from './ChannelSetupComponent';
// import ChannelCreationComponent from './ChannelCreationComponent';
// import ChannelUploadComponent from './ChannelUploadComponent';

function AppRoutes() {
  return (


<Router>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/forget-password" element={<ForgetPassword />} />
<Route path="/reset-password" element={<ResetPassword />} /> 
<Route path="/channel-creation" element={<channelCreationComponent />} /> 
<Route path="/channel-action" element={<Channelactionscomponent />} /> 
<Route path="/viewership" element={<Viewership />} /> 



  <Route element={<CmsLayout />}>

    <Route path="Scheduling" element={<Scheduling />} />
    <Route path="Asset" element={<CmsChannelDetail />} />
    {/* Add other nested routes for the "CmsLayout" here */}
  </Route>



      {/* <Route exact path="/" component={LoginComponent} />
  {/* Define other routes here */}
     {/* <Route path="/viewership" component={ViewershipComponent} />
        <Route path="/dashbord" component={DashboardComponent} />
        <Route path="/dashbord-channel" component={DashbordChannelComponent} />
        <Route path="/channel-actions" component={ChannelActionsComponent} />
        <Route path="/scheduling" component={SchedulingComponent} />
        <Route path="/channel-setup" component={ChannelSetupComponent} />
        <Route path="/channel-creation" component={ChannelCreationComponent} />
        <Route path="/channel-upload" component={ChannelUploadComponent} /> */}
</Routes>
</Router>



  );
}

export default AppRoutes;
