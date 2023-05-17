import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../app/utils/constants';
import { TrainingsData } from '../../types/state';
import { fetchTrainingsAction } from '../api-actions';

const initialState: TrainingsData = {
  trainings: [],
  isDataLoaded: false,
};

export const trainingsData = createSlice({
  name: NameSpace.Trainings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchTrainingsAction.rejected, (state) => {
        state.isDataLoaded = true;
      });
  }
});
