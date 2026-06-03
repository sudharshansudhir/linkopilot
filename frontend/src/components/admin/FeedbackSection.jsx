import {
  useEffect,
  useState,
} from "react";

import {
  getAllFeedbacks,
  resolveFeedback,
} from "../../services/feedbackService";

function FeedbackSection() {
  const [feedbacks,
    setFeedbacks] =
    useState([]);

  const loadFeedbacks =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        const data =
          await getAllFeedbacks(
            token
          );

        setFeedbacks(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleResolve =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        await resolveFeedback(
          id,
          token
        );

        loadFeedbacks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <section className="p-6">

      <h2 className="text-3xl mb-6 text-yellow-400">
        User Suggestions
      </h2>

      <div className="space-y-4">

        {feedbacks.map(
          (feedback) => (
            <div
              key={
                feedback._id
              }
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-6"
            >

              <div className="flex justify-between items-start gap-4">

                <div>

                  <h3 className="text-white">
                    {
                      feedback.user
                        ?.name
                    }
                  </h3>

                  <p className="text-zinc-500 text-sm">
                    {
                      feedback.user
                        ?.email
                    }
                  </p>

                  <p className="text-white mt-4">
                    {
                      feedback.message
                    }
                  </p>

                </div>

                <div>

                  {feedback.status ===
                  "resolved" ? (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                      Resolved
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        handleResolve(
                          feedback._id
                        )
                      }
                      className="px-4 py-2 bg-yellow-400 text-black font-medium"
                    >
                      Resolve
                    </button>
                  )}

                </div>

              </div>

            </div>
          )
        )}

      </div>

    </section>
  );
}

export default FeedbackSection;