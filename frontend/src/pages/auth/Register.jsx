import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

function Register() {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

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

      await api.post(
        "/auth/register",
        formData
      );

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 border border-zinc-800 rounded-xl overflow-hidden">

        <div className="hidden lg:flex flex-col justify-center p-16">

          <h1 className="text-6xl font-bold text-yellow-400 mb-6">
            Link-O-Pilot
          </h1>

          <p className="text-cyan-300 text-xl">
            Engineering the next
            hyper-structure of the
            web.
          </p>
        </div>

        <div className="bg-zinc-950 p-10 lg:p-16">

          <h2 className="text-4xl font-bold text-white mb-3">
            Initialize Account
          </h2>

          <p className="text-zinc-400 mb-10">
            Create your command
            center account.
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
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="w-full bg-black border border-zinc-700 p-4 text-white"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className="w-full bg-black border border-zinc-700 p-4 text-white"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className="w-full bg-black border border-zinc-700 p-4 text-white"
            />

            <button
              disabled={
                loading
              }
              className="w-full bg-yellow-400 text-black font-bold py-4"
            >
              {loading
                ? "CREATING..."
                : "INITIALIZE ACCOUNT"}
            </button>
          </form>

          <div className="mt-8 text-center text-zinc-400">
            Already have an
            account?
            <Link
              to="/login"
              className="text-yellow-400 ml-2"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;