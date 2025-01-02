import api from "./axiosInstance";

export async function getAllNotifications() {
  try {
    const response = await api.get("/notification");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get notifications");
  }
}

export async function readAllNotifications() {
  try {
    const response = await api.patch("/notification/read");
    return true;
  } catch (error) {
    throw new Error("Could not read notifications");
  }
}

export async function deleteNotification(id) {
  try {
    await api.delete(`/notification/${id}`);
    return true;
  } catch (error) {
    throw new Error("Could not delete");
  }
}
