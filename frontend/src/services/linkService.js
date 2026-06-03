import api from "./api";

export const getMyLinks =
  async () => {
    const { data } =
      await api.get("/links");

    return data.links;
  };

export const deleteLink =
  async (id) => {
    const { data } =
      await api.delete(
        `/links/${id}`
      );

    return data;
  };

  export const updateLink =
  async (id, body) => {
    const { data } =
      await api.put(
        `/links/${id}`,
        body
      );

    return data;
  };