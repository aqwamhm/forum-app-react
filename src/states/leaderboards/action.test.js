/**
 * test scenario for leaderboards action
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch actions correctly on success
 *  - should dispatch actions correctly on failure
 *
 */

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncReceiveLeaderboards,
  receiveLeaderboardsActionCreator,
} from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const mockLeaderboards = {
  users: [
    { id: 1, name: 'User1', score: 100 },
    { id: 2, name: 'User2', score: 90 },
  ],
};
const mockError = new Error('API error');

beforeEach(() => {
  api._getLeaderboards = api.getLeaderboards;
});

afterEach(() => {
  api.getLeaderboards = api._getLeaderboards;
  delete api._getLeaderboards;
});

describe('asyncReceiveLeaderboards thunk', () => {
  it('should dispatch actions correctly on success', async () => {
    api.getLeaderboards = () => Promise.resolve(mockLeaderboards);

    const dispatch = vi.fn();

    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      receiveLeaderboardsActionCreator(mockLeaderboards)
    );
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('should dispatch actions correctly on failure', async () => {
    api.getLeaderboards = () => Promise.reject(mockError);

    const dispatch = vi.fn();

    await expect(asyncReceiveLeaderboards()(dispatch)).rejects.toThrow(
      mockError
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(mockLeaderboards)
    );
  });
});
