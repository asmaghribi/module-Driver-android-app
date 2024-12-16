export interface AuthResponse {
    user: {
        firstname: string;
        lastname: string;
        password: string;
        access_token: string;
        expires_in: number;
        remember: boolean;
        email: string;
        id: number;
    }
  }
  