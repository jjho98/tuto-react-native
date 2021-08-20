import client from "./client";

export const login = (formData: { email: string; password: string }) =>
  client.post("/auth/login", formData);

export const register = (formData: {
  email: string;
  password: string;
  nickname: string;
}) => client.post("/auth/join", formData);
