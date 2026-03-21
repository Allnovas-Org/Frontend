// User types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'freelancer';
  profilePhoto?: string;
  createdAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'freelancer';
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}