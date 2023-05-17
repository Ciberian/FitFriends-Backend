import { gymsData } from './gyms-data';
import { GymsData } from '../../types/state';
import { fakeGyms } from '../../app/utils/mocks';
import { fetchGymsAction } from '../api-actions';

describe('Reducer: gymsData', () => {
  let state: GymsData;

  beforeEach(() => {
    state = {
      gyms: [],
      isDataLoaded: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(gymsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchGymsAction test', () => {
    it('should not update state if fetchGymsAction pending', () => {
      expect(gymsData.reducer(state, {type: fetchGymsAction.pending.type}))
        .toEqual(state);
    });
    it('should update gyms to "fakeGyms" and loading status to "true" if fetchGymsAction fullfilled', () => {
      expect(gymsData.reducer(state, {type: fetchGymsAction.fulfilled.type, payload: fakeGyms}))
        .toEqual({...state, gyms: fakeGyms, isDataLoaded: true});
    });
    it('should update loading status to "true" if fetchGymsAction rejected', () => {
      expect(gymsData.reducer(state, {type: fetchGymsAction.rejected.type}))
        .toEqual({...state, isDataLoaded: true});
    });
  });
});
