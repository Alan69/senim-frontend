import { TUser, TChangePasswordResponse, TUpdateBalanceResponse } from '../types/api';

// Mock user data
export const mockUserData = {
  username: "testuser",
  first_name: "Test",
  last_name: "User",
  region: "astana",
  school: "test_school",
  balance: "1000",
  referral_link: null,
  referral_bonus: "0",
  test_is_started: false,
  user_type: "STUDENT",
  grade: "11"
} as TUser;

export const mockChangePasswordResponse: TChangePasswordResponse = {
  new_password: "newpassword123",
  refresh: "mock_new_refresh_token",
  access: "mock_new_access_token"
};

export const mockUpdateBalanceResponse: TUpdateBalanceResponse = {
  success: "Balance updated successfully"
};
