import client from "./client";

type loginFunc = (
  email: string,
  password: string
) => Promise<{ message: string; token: string }>;

export const login: loginFunc = (email: string, password: string) =>
  client.post("/auth/login", { email, password });

export const register = (nickname: string, email: string, password: string) =>
  client.post("/auth/join", { nickname, email, password });
