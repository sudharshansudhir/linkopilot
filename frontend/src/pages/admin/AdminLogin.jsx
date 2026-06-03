import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import api from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await api.post(
          "/admin/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "adminToken",
        data.token
      );

      navigate(
        "/admin/dashboard"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-zinc-800">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-950/40 via-black to-yellow-950/20 p-12">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-yellow-400 to-cyan-400 flex items-center justify-center text-black text-4xl mb-8">

            <FaUserShield />

          </div>

          <h1 className="text-6xl font-black text-white leading-tight">

            Welcome
            <br />

            <span className="text-yellow-400">
              Admin
            </span>

          </h1>

          <p className="text-zinc-400 text-lg mt-6 max-w-md">

            Manage users, monitor
            analytics, track trending
            links and control the
            entire Link-O-Pilot
            ecosystem.

          </p>

        </div>

        {/* RIGHT */}

        <div className="bg-zinc-950 p-10 md:p-14">

          <h2 className="text-white text-4xl font-black mb-2">

            Admin Login

          </h2>

          <p className="text-zinc-400 mb-10">

            Sign in to access the
            administration panel.

          </p>

          <form
            onSubmit={
              submitHandler
            }
            className="space-y-6"
          >

            <div className="relative">

              <FaEnvelope
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                w-full
                bg-black
                border
                border-zinc-700
                rounded-2xl
                pl-12
                pr-4
                py-4
                text-white
                focus:border-cyan-400
                outline-none
                transition
                "
              />

            </div>

            <div className="relative">

              <FaLock
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
                "
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                w-full
                bg-black
                border
                border-zinc-700
                rounded-2xl
                pl-12
                pr-4
                py-4
                text-white
                focus:border-cyan-400
                outline-none
                transition
                "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-yellow-400
              to-cyan-400
              text-black
              font-bold
              hover:scale-[1.02]
              transition-all
              "
            >
              {loading
                ? "Authenticating..."
                : "Access Dashboard"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;