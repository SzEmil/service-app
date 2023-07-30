export type userType = {
  _id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  token?: string | undefined;
  password?: string | undefined;
  avatarURL: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  invitations?: string[] | [];
};
