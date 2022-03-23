type Token = { refresh: string; access: string };

type TokenObtain = {
  username: string;
  password: string;
};

type TokenRefresh = {
  refresh: string;
};

export type { Token, TokenObtain, TokenRefresh };
