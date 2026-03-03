export type User = {
  userId: string;
  name: string;
  email: string;
  photoUrl: string;
  color: string;
};

export type AuthProvider = {
  user: {
    userId: string;
    organizationId: string;
    name: string;
    email: string;
    photoUrl: string;
  };
};
