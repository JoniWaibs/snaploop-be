export interface CreateUserDTO {
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}
