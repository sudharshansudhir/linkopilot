import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaRocket,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function UserNavbar() {
  const location = useLocation();

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Links",
      path: "/links",
    },
    {
      name: "Trending",
      path: "/trending",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
    {
      name: "About",
      path: "/feedback",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const handleLogout = () => {
    logout();
    localStorage.clear()
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-yellow-500/10">

        <div className="max-w-7xl mx-auto px-5">

          <div className="h-20 flex items-center justify-between">

            {/* LOGO */}

            <Link
              to="/dashboard"
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-400 to-cyan-400 flex items-center justify-center">

                <FaRocket className="text-black" />

              </div>

              <div>

                <h1 className="text-white font-bold text-xl">
                  Link-O-Pilot
                </h1>

                <p className="text-xs text-zinc-500">
                  URL Intelligence
                </p>

              </div>

            </Link>

            {/* DESKTOP MENU */}

            <div className="hidden lg:flex items-center gap-3">

              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    location.pathname ===
                    item.path
                      ? "bg-yellow-400 text-black font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
<Link
  to="/admin/login"
  onClick={() => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );
  }}

  className="
  px-3
  py-1.5
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
  Admin Dashboard
</Link>

            </div>

            {/* RIGHT */}

            <div className="hidden lg:flex items-center gap-3">

              <button
                onClick={handleLogout}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-red-500/40
                  text-red-400
                  hover:bg-red-500
                  hover:text-white
                  transition-all
                "
              >
                Logout
              </button>

            </div>

            {/* MOBILE BUTTON */}

            <button
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
              className="lg:hidden text-white text-2xl"
            >
              {mobileOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800">

          <div className="px-5 py-5 flex flex-col gap-3">

            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() =>
                  setMobileOpen(
                    false
                  )
                }
                className={`px-4 py-3 rounded-xl ${
                  location.pathname ===
                  item.path
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-900 text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="
                mt-2
                px-4
                py-3
                rounded-xl
                bg-red-500
                text-white
              "
            >
              Logout
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default UserNavbar;