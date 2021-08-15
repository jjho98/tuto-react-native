import client from "./client";

export const login = (email: string, password: string) =>
  client.post("/auth/login", { email, password });

export const register = (nickname: string, email: string, password: string) =>
  client.post("/auth/join", { nickname, email, password });
