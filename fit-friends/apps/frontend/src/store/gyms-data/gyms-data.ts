import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../app/utils/constants';
import { GymsData } from '../../types/state';
import { fetchGymsAction } from '../api-actions';

const initialState: GymsData = {
  gyms: [],
  isDataLoaded: false,
};

export const gymsData = createSlice({
  name: NameSpace.Gyms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGymsAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchGymsAction.fulfilled, (state, action) => {
        state.gyms = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchGymsAction.rejected, (state) => {
        state.isDataLoaded = true;
      });
  }
});
