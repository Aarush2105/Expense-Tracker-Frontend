import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../components/ui/card";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import AuthLayout from "../layout/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { signupUser } from "../api/auth";
import { signupSchema } from "../validation/auth";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const result = signupSchema.safeParse({ name, email, password });

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      if (field) {
        fieldErrors[field] = err.message;
      }
    });

    setError(fieldErrors);
    return; 
  }
  setError({});
  setLoading(true);

  try {
    const data = await signupUser(result.data);

    login(data.token, { email: data.user.email });
    navigate("/dashboard");

  } catch (err: any) {
    if (err.field) {
      setError({ [err.field]: err.message });
    } else {
      setError({ general: err.message || "Signup failed" });
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout>
      <Card>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Create Account
        </h2>

        <p className="text-sm text-muted text-center mb-6">
          Start tracking your expenses today
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <Input label="Name" value={name}
              onChange={(e) => { setName(e.target.value);
                setError((prev) => ({ ...prev, name: "" }));
              }}
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div>
            <Input label="Email" type="email" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError((prev) => ({ ...prev, email: "" }));
              }}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>
          <div>
            <Input label="Password" type="password" value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError((prev) => ({ ...prev, password: "" }));
              }}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">
                {error.password}
              </p>
            )}
          </div>
          {error.general && (
            <p className="text-red-500 text-sm text-center">
              {error.general}
            </p>
          )}

          <Button type="submit">
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-muted mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
