import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { ChannelDataReducer,MapDataReducer } from './slices';

export const store = configureStore({
  reducer: {
    ChannelData: ChannelDataReducer,
    MapData: MapDataReducer,
  },
  middleware: [thunkMiddleware],
});