// Mock baseQuery function
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Track test state
let testStarted = false;

// Import mock data directly to avoid circular dependencies
const mockLoginResponse = {
  access: "mock_access_token_12345",
  refresh: "mock_refresh_token_67890"
};

const mockSignUpResponse = {
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
  }
};

const mockTokenResponse = {
  access: "mock_new_access_token_12345",
  refresh: "mock_new_refresh_token_67890"
};

const getMockUserData = () => ({
  username: "testuser",
  first_name: "Test",
  last_name: "User",
  region: "astana",
  school: "test_school",
  balance: "1000",
  referral_link: null,
  referral_bonus: "0",
  test_is_started: testStarted,
  user_type: "STUDENT",
  grade: "11"
});

const mockChangePasswordResponse = {
  new_password: "newpassword123",
  refresh: "mock_new_refresh_token",
  access: "mock_new_access_token"
};

const mockUpdateBalanceResponse = {
  success: "Balance updated successfully"
};

const mockProductList = [
  {
    id: "1",
    title: "ENT Preparation Course",
    sum: 5000,
    time: 180,
    subject_limit: 5,
    description: "Complete ENT preparation course for students",
    product_type: "STUDENT",
    product_actual_name: "ENT"
  },
  {
    id: "2",
    title: "OZP Practice Tests",
    sum: 3000,
    time: 120,
    subject_limit: 3,
    description: "OZP practice tests collection",
    product_type: "STUDENT",
    product_actual_name: "OZP"
  }
];

const mockProductById = mockProductList[0];

const mockSubjectList = [
  {
    grade: "11",
    tests: [
      {
        id: "subject_1",
        title: "Mathematics",
        is_required: true
      },
      {
        id: "subject_2",
        title: "Physics",
        is_required: false
      }
    ]
  }
];

const mockTestData = {
  id: "test_1",
  title: "Mathematics Test",
  questions: [
    {
      id: "q1",
      text: "What is 2 + 2?",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "5" },
        { id: "d", text: "6" }
      ]
    }
  ]
};

const mockStartTestResponse = {
  test_is_started: true,
  time: 180,
  tests: [mockTestData]
};

const mockCompleteTestResponse = {
  completed_test_id: "completed_test_123"
};

const mockCompletedTestList = [
  {
    id: "completed_1",
    start_test_time: "2024-01-15T10:00:00Z",
    completed_date: "2024-01-15T11:30:00Z",
    user: "user_123",
    product: {
      id: "1",
      title: "ENT Preparation Course",
      total_question_count_by_all_tests: 45,
      total_correct_by_all_tests: 38,
      total_incorrect_by_all_tests: 7,
      tests: []
    },
    correct_answers_count: 38
  }
];

const mockCompletedTestById = mockCompletedTestList[0];

const mockRegionList = [
  {
    id: "astana",
    name: "Astana",
    region_type: "city",
    description: "Capital city of Kazakhstan"
  },
  {
    id: "almaty",
    name: "Almaty",
    region_type: "city",
    description: "Largest city in Kazakhstan"
  }
];

export const mockBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Extract URL and method from args
  const url = typeof args === 'string' ? args : args.url;
  const method = typeof args === 'string' ? 'GET' : (args.method || 'GET');

  console.log('Mock API call:', method, url);

  // Mock responses based on URL and method
  switch (url) {
    // Auth endpoints
    case '/token/':
      if (method === 'POST') {
        return { data: mockLoginResponse };
      }
      break;

    case '/register/':
      if (method === 'POST') {
        return { data: mockSignUpResponse };
      }
      break;

    case '/token/refresh/':
      if (method === 'POST') {
        return { data: mockTokenResponse };
      }
      break;

    // User endpoints
    case '/user/auth/':
      if (method === 'GET') {
        const response = { data: { user_data: getMockUserData() } };
        console.log('Mock user auth response:', response);
        return response;
      }
      break;

    case '/user/update/':
      if (method === 'PUT') {
        return { data: getMockUserData() };
      }
      break;

    case '/change/password/':
      if (method === 'POST') {
        return { data: mockChangePasswordResponse };
      }
      break;

    case '/update/balance/':
      if (method === 'POST') {
        return { data: mockUpdateBalanceResponse };
      }
      break;

    // Product endpoints
    case '/products/':
      if (method === 'GET') {
        const response = { data: mockProductList };
        console.log('Mock products response:', response);
        return response;
      }
      break;

    case '/current/test/':
      if (method === 'POST') {
        testStarted = true; // Set test as started
        const response = { data: mockStartTestResponse };
        console.log('Mock start test response:', response);
        return response;
      }
      break;

    case '/complete/test/':
      if (method === 'POST') {
        testStarted = false; // Reset test state when completed
        return { data: mockCompleteTestResponse };
      }
      break;

    // Regions endpoints
    case '/regions/':
      if (method === 'GET') {
        return { data: mockRegionList };
      }
      break;

    // Completed tests endpoints
    case '/completed-tests/':
      if (method === 'GET') {
        return { data: mockCompletedTestList };
      }
      break;

    default:
      // Handle dynamic URLs
      if (url.startsWith('/products/') && url.endsWith('/') && method === 'GET') {
        const productId = url.split('/')[2];
        if (productId && productId !== 'products') {
          return { data: mockProductById };
        }
      }

      if (url.startsWith('/product/') && url.includes('/tests/') && method === 'GET') {
        return { data: mockSubjectList };
      }

      if (url.startsWith('/completed-tests/') && url !== '/completed-tests/' && method === 'GET') {
        const testId = url.split('/')[2];
        if (testId && testId !== 'completed-tests') {
          return { data: mockCompletedTestById };
        }
      }

      // If no mock found, return error
      return {
        error: {
          status: 404,
          data: { message: `Mock endpoint not found for ${method} ${url}` }
        }
      };
  }

  // Default error response
  return {
    error: {
      status: 404,
      data: { message: `Mock endpoint not found for ${method} ${url}` }
    }
  };
};
