import client from "./client";

export const changeMyInfo = async (myInfo) => {
  try {
    const formData = new FormData();
    formData.append("nickname", myInfo.nickname);
    formData.append("message", myInfo.message);
    formData.append("thumbnail", myInfo.thumbnail);
    return client.put("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getMyInfo = () => client.get("/users/me");
