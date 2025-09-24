// API type definitions to avoid circular dependencies

export enum ProductType {
  STUDENT= "STUDENT",
  TEACHER = "TEACHER"
}

export enum ProductActualName {
  ENT = "ENT",
  OZP = "OZP",
  REZERV = "REZERV",
  ADMIN_SREZ = "ADMIN_SREZ"
}

export type TProductResponse = {
  id: string;
  title: string;
  sum: number;
  time: number;
  subject_limit: number;
  description: string;
  product_type: ProductType;
  product_actual_name: ProductActualName;
}

export type TSubject = {
  id: string;
  title: string;
  is_required: boolean;
}

export type TSubjectResponse = {
  grade: string;
  tests: TSubject[];
}

export type TTest = {
  id: string
  title: string
  questions: TQuestion[]
}

export type TQuestion = {
  id: string
  text: string
  text2?: string
  text3?: string
  options: TOption[]
  img?: string
  task_type?: number
  source_text?: string
}

export type TOption = {
  id: string
  text: string
  img?: string
}

export type TStartTestRequest = {
  product_id: string;
  tests_ids: string[];
}

export type TStartTestResponse = {
  test_is_started: boolean;
  time: number;
  tests: TTest[];
}

export type TCompleteTestRequest = {
  product_id: string;
  tests: {
    id: string;
    questions: {
      id: string;
      option_id: string
    }[]
  }[]
}

export type TCompleteTestResponse = {
  completed_test_id: string;
}

// User types
export type TUser = {
  username: string
  first_name: string
  last_name: string
  region: string
  school: string
  balance: string
  referral_link: any
  referral_bonus: string
  test_is_started: boolean
  user_type: string
  grade: string
}

export type TUserData = {
  user_data: TUser;
};

export type TChangePasswordRequest = {
  current_password: string;
  new_password: string
  new_password2: string
}

export type TChangePasswordResponse = {
  new_password: string;
  refresh: string
  access: string
}

export type TUpdateBalanceResponse = {
  success: string
}

export type TUpdateUser = {
  username: string;
  first_name: string;
  last_name: string;
  region: string;
  school: string;
  referral_link?: string;
  referral_bonus?: string
}

// Auth types
export type TLogin = {
  username: string;
  password: string;
}

export type TSignUp = {
  username: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  region: string;
  school: string;
  user_type: string;
  grade?: string;
}

export type TLoginResponse = {
  data: {
    access: string;
    refresh: string;
  }
}

export type TSignUpResponse = {
  access: string;
  refresh: string;
  user: TUserData;
}

export type TTokenResponse = {
  access: string;
  refresh: string;
}

// Completed test types
export type TAllOptions = {
  id: string;
  text: string;
  is_correct: boolean
}

export type TSelectedOption = {
  id: string;
  text: string;
  is_correct: boolean
}

export type TCompletedQuestion = {
  id: string;
  question_text: string;
  selected_option: TSelectedOption[] | null;
  all_options: TAllOptions[]
}

export type TCompletedTest = {
  id: string;
  title: string;
  total_correct_by_test: number;
  total_incorrect_by_test: number;
  questions: TCompletedQuestion[];
}

export interface TProduct {
  id: string;
  title: string;
  total_question_count_by_all_tests: number;
  total_correct_by_all_tests: number;
  total_incorrect_by_all_tests: number;
  tests: TCompletedTest[];
}

export interface TCompletedTestResponse {
  id: string;
  completed_date: string;
  start_test_time: string;
  user: string;
  product: TProduct;
}

export interface TCompletedTestListResponse {
  id: string;
  start_test_time: string;
  completed_date: string;
  user: string;
  product: TProduct;
  correct_answers_count: number
}

// Region types
export type TRegionListResponse = {
  id: string;
  name: string;
  region_type: string;
  description: string;
}
