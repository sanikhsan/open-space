/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreLoad) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreLoad,
    },
  };
}

// Fungsi Thunk
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // proses preload
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // proses fallback
      dispatch(setAuthUserActionCreator(null));
    } finally {
      // end proses preload
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
