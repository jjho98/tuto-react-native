import client from "./client";

export const getTutorials = (category: string) =>
  client.get(`/tutorials/${category}`);
