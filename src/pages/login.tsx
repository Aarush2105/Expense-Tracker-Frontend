import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../components/ui/card";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import AuthLayout from "../layout/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { loginSchema } from "../validation/auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState<{ [key: string]: string }>({});


  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      if (field) {
        fieldErrors[field] = err.message;
      }
    });

    setErrors(fieldErrors);
    return;
  }
  setErrors({});
  setLoading(true);

  try {
    const data = await loginUser(result.data);
    login(data.token, { email: data.user.email });
    navigate("/dashboard");

  } catch (err: any) {
    setErrors({ general: err.message || "Login failed" });
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout>
      <Card>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-muted text-center mb-6">
          Login to continue managing your finances
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input label="Email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <p className="text-red-500 text-sm">{error.email}</p>
          )}

          <Input label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}

          {error.general && (
          <p className="text-red-500 text-sm text-center">
            {error.general}
          </p>
          )}

          <Button type="submit">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-muted mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
