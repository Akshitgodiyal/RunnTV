import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { ChannelDataReducer,MapDataReducer,AssetDetailReducer  } from './slices';

export const store = configureStore({
  reducer: {
    ChannelData: ChannelDataReducer,
    MapData: MapDataReducer,
    AssetDetail:  AssetDetailReducer,

  },
  middleware: [thunkMiddleware],
});