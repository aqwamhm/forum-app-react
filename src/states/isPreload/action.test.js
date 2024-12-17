/**
 * test scenario for isPreload action
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching is success
 *  - should dispatch action correctly when data fetching is failed
 *
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUser = {
  id: 1,
  email: 'fake@email.com',
  name: 'Fake Name',
  avatar: 'fake-avatar',
};
const fakeErrorResponse = new Error('fake error');

beforeEach(() => {
  api._getOwnProfile = api.getOwnProfile;
});

afterEach(() => {
  api.getOwnProfile = api._getOwnProfile;
  delete api._getOwnProfile;
});

describe('asyncPreloadProcess thunk', () => {
  it('should dispatch action correctly when data fetching is success', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUser)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching is failed', async () => {
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
