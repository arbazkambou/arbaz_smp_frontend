import api from "./axiosInstance";

export async function addProduct(productData) {
  try {
    const res = await api.post("/product", productData);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Could not add product");
  }
}
