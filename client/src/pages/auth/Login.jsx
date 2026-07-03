import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const response = await login(formData);

      localStorage.setItem("token", response.token);

      setUser(response.user);

      toast.success(response.message);

      if (response.user.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/tenant");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Login to Rent Flatmate Finder
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            className="mb-2 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="mb-4 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="mb-2 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="mb-4 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mb-6 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;