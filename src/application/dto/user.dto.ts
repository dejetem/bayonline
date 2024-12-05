export interface RegisterUserDTO {
    username: string;
    password: string;
    role: "user" | "admin";
  }
  
  export interface LoginUserDTO {
    username: string;
    password: string;
  }
  