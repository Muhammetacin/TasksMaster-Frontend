export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  isSuccess: boolean;
  userName: string;
}
