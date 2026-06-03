import { useState } from "react";
import { FaLock, FaGlobe } from "react-icons/fa";
import api from "../../services/api";

function CreateLinkModal({
  isOpen,
  onClose,
  refreshLinks,
}) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      originalUrl: "",
      category: "General",
      customAlias: "",
      isPublic: true,
      expiresAt: "",
    });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");

      if (
        !validateUrl(
          formData.originalUrl
        )
      ) {
        setError(
          "Please enter a valid URL."
        );

        return;
      }

      try {
        setLoading(true);

        const payload = {
          ...formData,
        };

        if (
          !payload.expiresAt
        ) {
          delete payload.expiresAt;
        }

        await api.post(
          "/links",
          payload
        );

        refreshLinks();

        onClose();

        setFormData({
          title: "",
          originalUrl: "",
          category:
            "General",
          customAlias: "",
          isPublic: true,
          expiresAt: "",
        });
      } catch (error) {
        setError(
          error?.response?.data
            ?.message ||
            "Failed to create link"
        );
      } finally {
        setLoading(false);
      }
    };

  if (!isOpen) return null;

  return (
    <div className="
fixed
inset-0
z-50
bg-black/80
backdrop-blur-sm
flex
justify-center
items-start
overflow-y-auto
py-24
px-4
">

      <div className="w-full max-w-2xl rounded-3xl border border-yellow-500/20 bg-zinc-950 overflow-hidden">

        {/* HEADER */}

        <div className="p-6 border-b border-zinc-800">

          <h2 className="text-3xl font-bold text-white">
            Create New Link
          </h2>

          <p className="text-zinc-400 mt-2">
            Shorten, track and manage your URLs.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* TITLE */}

          <div>

            <label className="text-zinc-400 text-sm block mb-2">
              Link Title
            </label>

            <input
              type="text"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Google Search"
              required
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none"
            />

          </div>

          {/* URL */}

          <div>

            <label className="text-zinc-400 text-sm block mb-2">
              Original URL
            </label>

            <input
              type="text"
              name="originalUrl"
              value={
                formData.originalUrl
              }
              onChange={
                handleChange
              }
              placeholder="https://example.com"
              required
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none"
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label className="text-zinc-400 text-sm block mb-2">
              Category
            </label>

            <select
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
            >
              <option>
                General
              </option>
              <option>
                Portfolio
              </option>
              <option>
                Social
              </option>
              <option>
                Marketing
              </option>
              <option>
                Search
              </option>
              <option>
                Education
              </option>
            </select>

          </div>

          {/* ALIAS + EXPIRY */}

          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="text-zinc-400 text-sm block mb-2">
                Custom Alias
              </label>

              <input
                type="text"
                name="customAlias"
                value={
                  formData.customAlias
                }
                onChange={
                  handleChange
                }
                placeholder="my-link"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />

            </div>

            <div>

              <label className="text-zinc-400 text-sm block mb-2">
                Expiry Date
              </label>

              <input
                type="datetime-local"
                name="expiresAt"
                value={
                  formData.expiresAt
                }
                onChange={
                  handleChange
                }
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />

            </div>

          </div>

          {/* VISIBILITY */}

          <div>

            <label className="text-zinc-400 text-sm block mb-3">
              Visibility
            </label>

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    isPublic: true,
                  })
                }
                className={`rounded-xl p-4 border transition-all ${
                  formData.isPublic
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-zinc-700"
                }`}
              >
                <FaGlobe className="mx-auto text-cyan-400 text-xl" />

                <p className="text-white mt-2">
                  Public
                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    isPublic: false,
                  })
                }
                className={`rounded-xl p-4 border transition-all ${
                  !formData.isPublic
                    ? "border-yellow-400 bg-yellow-500/10"
                    : "border-zinc-700"
                }`}
              >
                <FaLock className="mx-auto text-yellow-400 text-xl" />

                <p className="text-white mt-2">
                  Private
                </p>

              </button>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* ACTIONS */}

          <div className="flex gap-4 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-zinc-700 text-white hover:bg-zinc-900"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold"
            >
              {loading
                ? "Creating..."
                : "Create Link"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateLinkModal;