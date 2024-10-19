import { combineReducers } from '@reduxjs/toolkit';
import baseApi from './api';
import { authReducer } from 'modules/auth/redux/slices/authSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  // contentPlan: contentPlanReducer,
  // post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
