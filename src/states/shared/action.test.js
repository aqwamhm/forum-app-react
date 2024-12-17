/**
 * test scenario for shared action
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch actions correctly on success
 *  - should handle error and dispatch actions correctly
 *
 */

import { asyncPopulateUsersAndThreads } from './action';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockUsers = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

const mockThreads = [
  { id: 1, title: 'Thread 1' },
  { id: 2, title: 'Thread 2' },
];

const mockError = new Error('API error');

beforeEach(() => {
  api._getAllUsers = api.getAllUsers;
  api._getAllThreads = api.getAllThreads;
});

afterEach(() => {
  api.getAllUsers = api._getAllUsers;
  api.getAllThreads = api._getAllThreads;
  delete api._getAllUsers;
  delete api._getAllThreads;
  vi.restoreAllMocks();
});

describe('asyncPopulateUsersAndThreads thunk', () => {
  it('should dispatch actions correctly on success', async () => {
    api.getAllUsers = () => Promise.resolve(mockUsers);
    api.getAllThreads = () => Promise.resolve(mockThreads);
    window.alert = vi.fn();

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(mockUsers)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(mockThreads)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should handle error and dispatch actions correctly', async () => {
    api.getAllUsers = () => Promise.reject(mockError);
    window.alert = vi.fn();
    const getAllThreadSpy = vi.spyOn(api, 'getAllThreads');

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(
      receiveUsersActionCreator(mockUsers)
    );
    expect(dispatch).not.toHaveBeenCalledWith(
      receiveThreadsActionCreator(mockThreads)
    );
    expect(window.alert).toHaveBeenCalledWith(mockError.message);
    expect(getAllThreadSpy).not.toHaveBeenCalled();
  });
});
