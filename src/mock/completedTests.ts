import { TCompletedTestListResponse, TCompletedTestResponse } from '../types/api';

// Mock completed tests data
export const mockCompletedTestList: TCompletedTestListResponse[] = [
  {
    id: "completed_1",
    start_test_time: "2024-01-15T10:00:00Z",
    completed_date: "2024-01-15T11:30:00Z",
    user: "user_123",
    product: {
      id: "1",
      title: "ENT Preparation Course",
      total_question_count_by_all_tests: 10,
      total_correct_by_all_tests: 8,
      total_incorrect_by_all_tests: 2,
      tests: [
        {
          id: "test_1",
          title: "Mathematics",
          total_correct_by_test: 4,
          total_incorrect_by_test: 1,
          questions: [
            {
              id: "q1",
              question_text: "What is 2 + 2?",
              selected_option: [
                {
                  id: "b",
                  text: "4",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "3", is_correct: false },
                { id: "b", text: "4", is_correct: true },
                { id: "c", text: "5", is_correct: false },
                { id: "d", text: "6", is_correct: false }
              ]
            },
            {
              id: "q2",
              question_text: "What is the derivative of x²?",
              selected_option: [
                {
                  id: "a",
                  text: "2x",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "2x", is_correct: true },
                { id: "b", text: "x", is_correct: false },
                { id: "c", text: "x²", is_correct: false },
                { id: "d", text: "2x²", is_correct: false }
              ]
            },
            {
              id: "q3",
              question_text: "What is the integral of 2x?",
              selected_option: [
                {
                  id: "c",
                  text: "x² + C",
                  is_correct: false
                }
              ],
              all_options: [
                { id: "a", text: "2x² + C", is_correct: true },
                { id: "b", text: "x + C", is_correct: false },
                { id: "c", text: "x² + C", is_correct: false },
                { id: "d", text: "2 + C", is_correct: false }
              ]
            },
            {
              id: "q4",
              question_text: "What is sin(90°)?",
              selected_option: [
                {
                  id: "b",
                  text: "1",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "0", is_correct: false },
                { id: "b", text: "1", is_correct: true },
                { id: "c", text: "-1", is_correct: false },
                { id: "d", text: "undefined", is_correct: false }
              ]
            },
            {
              id: "q5",
              question_text: "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
              selected_option: [
                {
                  id: "a",
                  text: "0",
                  is_correct: false
                }
              ],
              all_options: [
                { id: "a", text: "0", is_correct: false },
                { id: "b", text: "1", is_correct: false },
                { id: "c", text: "2", is_correct: true },
                { id: "d", text: "undefined", is_correct: false }
              ]
            }
          ]
        },
        {
          id: "test_2",
          title: "Physics",
          total_correct_by_test: 8,
          total_incorrect_by_test: 2,
          questions: [
            {
              id: "q6",
              question_text: "What is Newton's second law?",
              selected_option: [
                {
                  id: "a",
                  text: "F = ma",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "F = ma", is_correct: true },
                { id: "b", text: "F = mv", is_correct: false },
                { id: "c", text: "E = mc²", is_correct: false },
                { id: "d", text: "P = mv", is_correct: false }
              ]
            },
            {
              id: "q7",
              question_text: "What is the speed of light in vacuum?",
              selected_option: [
                {
                  id: "b",
                  text: "3 × 10⁸ m/s",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "3 × 10⁶ m/s", is_correct: false },
                { id: "b", text: "3 × 10⁸ m/s", is_correct: true },
                { id: "c", text: "3 × 10¹⁰ m/s", is_correct: false },
                { id: "d", text: "3 × 10¹² m/s", is_correct: false }
              ]
            },
            {
              id: "q8",
              question_text: "What is the unit of electric current?",
              selected_option: [
                {
                  id: "c",
                  text: "Volt",
                  is_correct: false
                }
              ],
              all_options: [
                { id: "a", text: "Ampere", is_correct: true },
                { id: "b", text: "Watt", is_correct: false },
                { id: "c", text: "Volt", is_correct: false },
                { id: "d", text: "Ohm", is_correct: false }
              ]
            },
            {
              id: "q9",
              question_text: "What is the formula for kinetic energy?",
              selected_option: [
                {
                  id: "a",
                  text: "KE = ½mv²",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "KE = ½mv²", is_correct: true },
                { id: "b", text: "KE = mv", is_correct: false },
                { id: "c", text: "KE = mgh", is_correct: false },
                { id: "d", text: "KE = ½mv", is_correct: false }
              ]
            },
            {
              id: "q10",
              question_text: "What is the acceleration due to gravity on Earth?",
              selected_option: [
                {
                  id: "b",
                  text: "9.8 m/s²",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "9.8 m/s", is_correct: false },
                { id: "b", text: "9.8 m/s²", is_correct: true },
                { id: "c", text: "10 m/s²", is_correct: false },
                { id: "d", text: "9.8 m²/s", is_correct: false }
              ]
            }
          ]
        }
      ]
    },
    correct_answers_count: 8
  },
  {
    id: "completed_2",
    start_test_time: "2024-01-10T14:00:00Z",
    completed_date: "2024-01-10T15:20:00Z",
    user: "user_123",
    product: {
      id: "2",
      title: "OZP Practice Tests",
      total_question_count_by_all_tests: 30,
      total_correct_by_all_tests: 25,
      total_incorrect_by_all_tests: 5,
      tests: [
        {
          id: "test_2",
          title: "Physics",
          total_correct_by_test: 12,
          total_incorrect_by_test: 3,
          questions: [
            {
              id: "q1",
              question_text: "What is Newton's second law?",
              selected_option: [
                {
                  id: "a",
                  text: "F = ma",
                  is_correct: true
                }
              ],
              all_options: [
                { id: "a", text: "F = ma", is_correct: true },
                { id: "b", text: "F = mv", is_correct: false },
                { id: "c", text: "E = mc²", is_correct: false },
                { id: "d", text: "P = mv", is_correct: false }
              ]
            }
          ]
        }
      ]
    },
    correct_answers_count: 25
  }
];

export const mockCompletedTestById: TCompletedTestResponse = mockCompletedTestList[0];
