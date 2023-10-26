
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";


  const ChannelData = createSlice({
  name: "ChannelData",
  initialState : {
	data: []
  },
  reducers: {

    ChannelDataAction: (data, action) => {
      // console.log("config", action.payload);
      
      data.data = action.payload;
      }
	
  },
});

export const {ChannelDataAction} = ChannelData.actions;
export const ChannelDataReducer = ChannelData.reducer;



const MapData = createSlice({
  name: "MapData",
  initialState : {
	data: []
  },
  reducers: {

    MapDataAction: (data, action) => {
      // console.log("config", action.payload);
      
      data.data = action.payload;
      }
	
  },
});

export const {MapDataAction} = MapData.actions;
export const MapDataReducer = MapData.reducer;

const  AssetDetail = createSlice({
  name: " AssetDetail",
  initialState : {
	data: []
  },
  reducers: {

    AssetDetailAction: (data, action) => {
      // console.log("config", action.payload);
      
      data.data = action.payload;
      }
	
  },
});

export const {AssetDetailAction} =  AssetDetail.actions;
export const  AssetDetailReducer =  AssetDetail.reducer;




