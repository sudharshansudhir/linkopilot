import {
  useState,
} from "react";

import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSave,
} from "react-icons/fa";

import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/Footer";

function Profile() {
  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [editing,
    setEditing] =
    useState(false);

  const [name,
    setName] =
    useState(
      storedUser?.name || ""
    );

  const [email,
    setEmail] =
    useState(
      storedUser?.email || ""
    );

  const saveProfile =
    () => {
      const updatedUser = {
        ...storedUser,
        name,
        email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      setEditing(false);

      alert(
        "Profile Updated"
      );
    };

  return (
    <div className="min-h-screen bg-black">

      <UserNavbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* HERO */}

        <div
          className="
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-yellow-500/10
          bg-gradient-to-r
          from-cyan-950/40
          via-black
          to-yellow-950/30
          p-10
          mb-10
          "
        >

          <h1
            className="
            text-5xl
            md:text-6xl
            font-black
            "
          >
            <span className="text-yellow-400">
              My
            </span>{" "}
            <span className="text-white">
              Profile
            </span>
          </h1>

          <p className="text-zinc-400 mt-4">
            Manage your account
            information and
            personalize your
            Link-O-Pilot experience.
          </p>

        </div>

        {/* PROFILE CARD */}

        <div
          className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-3xl
          p-8
          "
        >

          <div className="flex flex-col items-center">

            <div
              className="
              w-32
              h-32
              rounded-full
              bg-gradient-to-r
              from-yellow-400
              to-cyan-400
              flex
              items-center
              justify-center
              text-black
              text-5xl
              font-black
              "
            >
              {name?.charAt(0)}
            </div>

            <h2 className="text-white text-3xl font-bold mt-6">
              {name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {email}
            </p>

          </div>

          {/* ACCOUNT DETAILS */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>

              <label className="text-zinc-400 text-sm">
                Full Name
              </label>

              <div className="relative mt-2">

                <FaUser
                  className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                  "
                />

                <input
                  type="text"
                  disabled={
                    !editing
                  }
                  value={name}
                  onChange={(
                    e
                  ) =>
                    setName(
                      e.target
                        .value
                    )
                  }
                  className="
                  w-full
                  bg-black
                  border
                  border-zinc-700
                  rounded-xl
                  pl-12
                  pr-4
                  py-4
                  text-white
                  "
                />

              </div>

            </div>

            <div>

              <label className="text-zinc-400 text-sm">
                Email Address
              </label>

              <div className="relative mt-2">

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
                  disabled={
                    !editing
                  }
                  value={email}
                  onChange={(
                    e
                  ) =>
                    setEmail(
                      e.target
                        .value
                    )
                  }
                  className="
                  w-full
                  bg-black
                  border
                  border-zinc-700
                  rounded-xl
                  pl-12
                  pr-4
                  py-4
                  text-white
                  "
                />

              </div>

            </div>

          </div>

          {/* ACCOUNT STATS */}

          <div className="mt-10">

            {/* <div
              className="
              bg-black
              border
              border-zinc-800
              rounded-2xl
              p-5
              "
            >

              <p className="text-zinc-500">
                Account Type
              </p>

              <h3 className="text-yellow-400 text-xl font-bold mt-2">
                User
              </h3>

            </div> */}

            <div
              className="
              bg-black
              border
              border-zinc-800
              rounded-2xl
              p-5
              "
            >

              <p className="text-zinc-500">
                Status
              </p>

              <h3 className="text-green-400 text-xl font-bold mt-2">
                Active
              </h3>

            </div>

            {/* <div
              className="
              bg-black
              border
              border-zinc-800
              rounded-2xl
              p-5
              "
            >

              <p className="text-zinc-500">
                Membership
              </p>

              <h3 className="text-cyan-400 text-xl font-bold mt-2">
                Free Plan
              </h3>

            </div> */}

          </div>

          {/* ACTIONS */}

          <div className="mt-10 flex gap-4">

            {!editing ? (
              <button
                onClick={() =>
                  setEditing(
                    true
                  )
                }
                className="
                flex
                items-center
                gap-2
                px-6
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-yellow-400
                to-cyan-400
                text-black
                font-bold
                "
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={
                  saveProfile
                }
                className="
                flex
                items-center
                gap-2
                px-6
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-green-500
                to-emerald-400
                text-black
                font-bold
                "
              >
                <FaSave />
                Save Changes
              </button>
            )}

          </div>

        </div>

      </div>
<Footer/>
    </div>
  );
}

export default Profile;