// src/types/userTypes.ts

// User roles enum - matches the backend
export enum UserRole {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
    SELLER = 'seller'
  }
  
  // ===== API Request/Response Types =====
  
  // Login request payload
  export interface IUserLogin {
    email: string;
    password: string;
  }
  
  // Registration request payload
  export interface IUserRegistration {
    username: string;
    email: string;
    password: string;
  }
  
  // User data returned from API
  export interface IUserResponse {
    id: string;
    email: string;
    role: UserRole | string;
    username?: string;
  }
  
  // Login response from API
  export interface ILoginResponse {
    token: string;
    user: IUserResponse;
  }
  
  // ===== Redux State Types =====
  
  // Auth slice state
  export interface AuthState {
    user: IUserResponse | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  // ===== Component Props =====
  
  // Props for LoginDialog component
  export interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
  }
  
  // Props for RegisterForm component
  export interface RegisterFormProps {
    onSuccess?: () => void;
  }
  
  // Props for ProtectedRoute component
  export interface ProtectedRouteProps {
    children: React.ReactNode;
  }
  
  // ===== Form Error Types =====
  
  // Login form validation errors
  export interface LoginFormErrors {
    email?: string;
    password?: string;
  }
  
  // Registration form validation errors
  export interface RegisterFormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  
  // ===== Additional Types =====
  
  // Address interface for user profile
  export interface IAddress {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  }
  
  // User profile update payload
  export interface IUserProfileUpdate {
    firstName?: string;
    lastName?: string;
    address?: IAddress[];
  }
  
  // Password change request
  export interface IPasswordChange {
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
  }