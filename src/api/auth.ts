export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("BACKEND RESPONSE:", result);

  if (!res.ok) {
    const error: any = new Error(result.message || "Signup failed");
    error.field = result.field;
    throw error;
  }

  return result;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};