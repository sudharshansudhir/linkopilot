import api from "./api";

export const submitFeedback =
  async (message) => {
    const { data } =
      await api.post(
        "/feedback",
        {
          message,
        }
      );

    return data;
  };

export const getAllFeedbacks =
  async (token) => {
    const { data } =
      await api.get(
        "/feedback",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data.feedbacks;
  };

export const resolveFeedback =
  async (
    id,
    token
  ) => {
    const { data } =
      await api.put(
        `/feedback/${id}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data;
  };