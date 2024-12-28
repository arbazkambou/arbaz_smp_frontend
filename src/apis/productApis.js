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

export async function getProducts() {
  try {
    const res = await api.get("/product");
    return res.data.data;
  } catch (error) {
    throw new Error("Could not get product");
  }
}

export async function updateProduct({ productId, productData }) {
  try {
    const res = await api.post(`/product/${productId}`, productData);
    return res.data.data;
  } catch (error) {
    throw new Error("Could not get product");
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await api.delete(`/product/${productId}`);
    return true;
  } catch (error) {
    throw new Error("Could not delete product");
  }
}

export async function uploadImages({ productId, imagesData }) {
  try {
    const res = await api.put(`/product/${productId}/images`, imagesData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.message;
  } catch (error) {
    throw new Error("Could not upload images");
  }
}

export async function deleteImageFromProduct({ productId, publicId }) {
  try {
    console.log(productId, publicId);
    const res = await api.delete(`/product/${productId}/images`, {
      data: { publicId },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Could not delete images");
  }
}
