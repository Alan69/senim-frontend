import { TUserData } from '../types/api';

// Mock auth data
export const mockLoginResponse = {
  data: {
    access: "mock_access_token_12345",
    refresh: "mock_refresh_token_67890"
  }
};

export const mockSignUpResponse = {
  access: "mock_access_token_12345",
  refresh: "mock_refresh_token_67890",
  user: {
    user_data: {
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
    }
  } as TUserData
};

export const mockTokenResponse = {
  access: "mock_new_access_token_12345",
  refresh: "mock_new_refresh_token_67890"
};
