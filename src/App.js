import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Channelactionscomponent from './pages/channel-actions';
import ChannelCreationComponent from './pages/channel-creation';
import ForgetPassword from './pages/forgotpassword';
import Viewership from './pages/viewership';
import ResetPassword from './pages/reset-password';

import AppRoutes from './routes/appRouting';


function App() {


  return (
  <AppRoutes />
  );
}

export default App;
