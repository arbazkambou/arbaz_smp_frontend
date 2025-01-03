import api from "./axiosInstance";

export async function login({ email, password }) {
  try {
    const res = await api.post("/user/login", {
      email,
      password,
    });
    return res.data.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Invalid credentials");
  }
}

export async function registerApi({ email, password, name }) {
  try {
    const response = await api.post("/user/register", {
      email,
      password,
      name,
    });
    return response.data.message;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function fetchUser() {
  try {
    const res = await api.get("/user/isAuthenticated", {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    throw new Error("User is not authenticated");
  }
}

export async function sendEmail({ email }) {
  try {
    const response = await api.post("/user/forgot-password", { email });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function resetPassword({ password, token }) {
  try {
    const response = await api.post(`/user/reset-password/token/${token}`, {
      password,
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function logoutUser() {
  await api.post("/user/logout");
}
