import { createProxyMiddleware } from "http-proxy-middleware";
import { urlBase } from "./url";

export const fetchListProduct = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error("Error creating user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchDetailProduct = async (idProduct) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/${idProduct}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 200) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error("Error creating user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addProduct = async (name, price) => {
  const bodyData = {
    name: name,
    price: price,
  };
  try {
    const response = await fetch(`http://localhost:8080/api/v1/product/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    console.log(response);
    if (response.status == 201) {
      const data = await response.json();
      return true;
    } else {
      console.error("Error creating user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const editProduct = async (id, name, price) => {
  const bodyData = {
    name: name,
    price: price,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/edit/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteProduct = async (idProduct) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/delete/${idProduct}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 200) {
      // const data = await response.json();
      // console.log(data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
