import { ProductType, ProductActualName, TProductResponse, TSubjectResponse, TTest, TStartTestResponse, TCompleteTestResponse } from '../types/api';

// Mock products data
export const mockProductList: TProductResponse[] = [
  {
    id: "1",
    title: "ENT Preparation Course",
    sum: 5000,
    time: 180,
    subject_limit: 5,
    description: "Complete ENT preparation course for students",
    product_type: ProductType.STUDENT,
    product_actual_name: ProductActualName.ENT
  },
  {
    id: "2",
    title: "OZP Practice Tests",
    sum: 3000,
    time: 120,
    subject_limit: 3,
    description: "OZP practice tests collection",
    product_type: ProductType.STUDENT,
    product_actual_name: ProductActualName.OZP
  },
  {
    id: "3",
    title: "Reserve Tests Bundle",
    sum: 2000,
    time: 90,
    subject_limit: 2,
    description: "Additional reserve tests",
    product_type: ProductType.STUDENT,
    product_actual_name: ProductActualName.REZERV
  }
];

export const mockProductById: TProductResponse = mockProductList[0];

export const mockSubjectList: TSubjectResponse[] = [
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
      },
      {
        id: "subject_3",
        title: "Chemistry",
        is_required: false
      },
      {
        id: "subject_4",
        title: "Biology",
        is_required: false
      },
      {
        id: "subject_5",
        title: "Kazakh Language",
        is_required: true
      }
    ]
  }
];

export const mockTestData: TTest = {
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
    },
    {
      id: "q2",
      text: "Solve for x: 2x + 3 = 7",
      options: [
        { id: "a", text: "x = 1" },
        { id: "b", text: "x = 2" },
        { id: "c", text: "x = 3" },
        { id: "d", text: "x = 4" }
      ]
    },
    {
      id: "q3",
      text: "What is the square root of 16?",
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "4" },
        { id: "c", text: "6" },
        { id: "d", text: "8" }
      ]
    }
  ]
};

export const mockStartTestResponse: TStartTestResponse = {
  test_is_started: true,
  time: 180,
  tests: [mockTestData]
};

export const mockCompleteTestResponse: TCompleteTestResponse = {
  completed_test_id: "completed_test_123"
};
