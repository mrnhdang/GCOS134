export const loginClient = async (userName, password) => {
  const formData = {
    username: userName,
    password: password,
  };
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status == 200) {
      const data = await response.json();
      return {
        id: data.id,
        username: data.username,
        password: data.password,
        email: data.email,
        loginIsDone: true,
      };
    } else {
      console.error("Error creating user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const registerClient = async (userName, password, email) => {
  const formData = {
    username: userName,
    password: password,
    email: email,
  };
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        id: data.id,
        username: data.username,
        password: data.password,
        email: data.email,
        isRegisterDone: true,
      };
    } else {
      console.error("Error creating user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
