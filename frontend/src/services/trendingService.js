import api from "./api";

export const getTrendingLinks =
  async () => {
    const { data } =
      await api.get(
        "/links/trending/public"
      );

    return data.links;
  };