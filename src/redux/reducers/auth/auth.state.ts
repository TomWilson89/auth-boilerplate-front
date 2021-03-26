export type IUSer = {
  name: string;
  email: string;
  role?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordExpire?: Date | null;
  _id: string;
};

export type AuthState = {
  isLoading: boolean;
  error: any;
  user: IUSer;
  accessToken: string;
  isAuth: boolean;
  success: boolean;
};
