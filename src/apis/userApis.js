import api from "./axiosInstance";

export async function getAllUsers() {
  try {
    const response = await api.get("/user");
    return response.data.data;
  } catch (error) {
    throw new Error("Could not get users");
  }
}

export async function updateUserStatus({ userId, userStatus }) {
  try {
    const response = await api.patch("/user/update-user-status", {
      userId,
      userStatus,
    });
    return true;
  } catch (error) {
    throw new Error("Could not update user status");
  }
}
