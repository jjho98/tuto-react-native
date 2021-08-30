import client from "./client";

export const getTutorials = (category: string, page: number) =>
  client.get(`/tutorials/${category}?page=${page}`);

export const createTutorial = async (tutorial) => {
  try {
    const formData = new FormData();
    formData.append("title", tutorial.title);
    formData.append("content", tutorial.content);
    formData.append("category_id", tutorial.category_id);
    formData.append("thumbnail", tutorial.thumbnail);

    return client.post("/tutorials", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
