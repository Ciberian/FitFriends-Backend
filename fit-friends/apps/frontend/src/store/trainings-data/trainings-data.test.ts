import { trainingsData } from './trainings-data';
import { TrainingsData } from '../../types/state';
import { fakeTrainings } from '../../app/utils/mocks';
import { fetchTrainingsAction } from '../api-actions';

describe('Reducer: trainingsData', () => {
  let state: TrainingsData;

  beforeEach(() => {
    state = {
      trainings: [],
      isDataLoaded: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(trainingsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchTrainingsAction test', () => {
    it('should not update state if fetchGymsAction pending', () => {
      expect(trainingsData.reducer(state, {type: fetchTrainingsAction.pending.type}))
        .toEqual(state);
    });
    it('should update trainings to "fakeTrainings" and loading status to "true" if fetchTrainingsAction fullfilled', () => {
      expect(trainingsData.reducer(state, {type: fetchTrainingsAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({...state, gyms: fakeTrainings, isDataLoaded: true});
    });
    it('should update loading status to "true" if fetchTrainingsAction rejected', () => {
      expect(trainingsData.reducer(state, {type: fetchTrainingsAction.rejected.type}))
        .toEqual({...state, isDataLoaded: true});
    });
  });
});
