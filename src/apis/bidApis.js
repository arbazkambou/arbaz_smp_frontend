import api from "./axiosInstance";

export async function getAllBids() {
  try {
    const response = await api.get("/bid");
    return response.data.data;
  } catch (error) {
    throw new Error("Could not get all bids");
  }
}

export async function placeBid({ message, seller, product, bidAmount, buyer }) {
  try {
    const response = await api.post("/bid", {
      message,
      seller,
      product,
      bidAmount,
      buyer,
    });
  } catch (error) {
    throw new Error("Could not place bid");
  }
}

export async function getBidsOnProduct(productId) {
  try {
    const response = await api.get(`/bid/get-product-bids/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Could not get bids");
  }
}
