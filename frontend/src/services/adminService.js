import api from "./api";

export const getAdminDashboard =
  async (token) => {
    const { data } =
      await api.get(
        "/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data;
  };

export const getAllUsers =
  async (token) => {
    const { data } =
      await api.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data.users;
  };

export const getAllLinks =
  async (token) => {
    const { data } =
      await api.get(
        "/admin/links",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data.links;
  };

export const getTopLinks =
  async (token) => {
    const { data } =
      await api.get(
        "/admin/top-links",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data.links;
  };

export const getTopUsers =
  async (token) => {
    const { data } =
      await api.get(
        "/admin/top-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data.users;
  };