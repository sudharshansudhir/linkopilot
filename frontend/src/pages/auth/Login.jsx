import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } =
        await api.post(
          "/auth/login",
          formData
        );

      login(
        data.user,
        data.token
      );

      navigate(
        "/dashboard"
      );
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 border border-zinc-800 rounded-xl overflow-hidden">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-black via-zinc-950 to-black">

          <h1 className="text-6xl font-bold text-yellow-400 mb-6">
            Link-O-Pilot
          </h1>

          <p className="text-cyan-300 text-xl leading-relaxed">
            Architecting the future of
            precision analytics and
            intelligent URL
            management.
          </p>
        </div>

        {/* RIGHT */}

        <div className="bg-zinc-950 p-10 lg:p-16">

          <h2 className="text-4xl font-bold text-white mb-3">
            Initialize Session
          </h2>

          <p className="text-zinc-400 mb-10">
            Enter your credentials
            to access command
            center.
          </p>

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            <div>
              <label className="block text-yellow-400 mb-2 uppercase tracking-widest text-sm">
                Operator Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="w-full bg-black border border-zinc-700 p-4 text-white outline-none focus:border-yellow-400"
                placeholder="name@email.com"
              />
            </div>

            <div>
              <label className="block text-yellow-400 mb-2 uppercase tracking-widest text-sm">
                Encrypted Key
              </label>

              <input
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className="w-full bg-black border border-zinc-700 p-4 text-white outline-none focus:border-yellow-400"
                placeholder="********"
              />
            </div>

            <button
              disabled={
                loading
              }
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 transition"
            >
              {loading
                ? "CONNECTING..."
                : "ACCESS COMMAND CENTER"}
            </button>
          </form>

<div className="mt-8 space-y-4">

  <div className="text-center text-zinc-400">

    Don't have an account?

    <Link
      to="/register"
      className="text-yellow-400 ml-2"
    >
      Register
    </Link>

  </div>

  <div className="flex justify-center">

    <Link
      to="/admin/login"
      className="
      px-4
      py-2
      text-xs
      font-semibold
      text-zinc-200
      bg-gradient-to-r
      from-zinc-300/10
      to-zinc-500/10
      border
      border-zinc-400/30
      rounded-full
      hover:border-zinc-300/60
      hover:bg-zinc-300/10
      transition-all
      duration-300
      "
    >
      Admin Login
    </Link>

  </div>

</div>
        </div>
      </div>
    </div>
  );
}

export default Login;