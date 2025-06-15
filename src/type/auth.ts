export interface IAuth {
  user: IUser;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  avatar: string;
}
