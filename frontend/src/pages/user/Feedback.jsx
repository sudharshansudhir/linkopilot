import {
  useState,
} from "react";

import UserNavbar from "../../components/user/UserNavbar";
import PageHeader from "../../components/user/PageHeader";

import {
  submitFeedback,
} from "../../services/feedbackService";
import Footer from "../../components/Footer";

function Feedback() {
  const [message,
    setMessage] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const submitHandler =
    async () => {
      if (!message.trim())
        return;

      try {
        setLoading(true);

        await submitFeedback(
          message
        );

        alert(
          "Feedback Submitted"
        );

        setMessage("");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-black">

      <UserNavbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <PageHeader
          title="Suggestions"
          subtitle="Help improve Link-O-Pilot."
        />

        <div
  className="
  mb-8
  rounded-3xl
  border
  border-cyan-500/10
  bg-gradient-to-r
  from-cyan-950/30
  via-black
  to-yellow-950/20
  p-8
  "
>

  <h2 className="text-3xl font-black text-white">
    About Link-O-Pilot
  </h2>

  <p className="text-zinc-400 mt-4 leading-relaxed">
    Link-O-Pilot is a modern URL
    shortening and analytics platform
    designed to help users create,
    manage and track links efficiently.
    It provides real-time click tracking,
    QR code generation, trending links,
    visitor analytics and admin
    management tools in one unified
    platform.
  </p>

  <div className="grid md:grid-cols-3 gap-4 mt-8">

    <div className="
    bg-black/40
    border
    border-zinc-800
    rounded-2xl
    p-5
    ">

      <h3 className="text-yellow-400 font-bold">
        URL Shortening
      </h3>

      <p className="text-zinc-500 mt-2">
        Generate clean and shareable
        links instantly.
      </p>

    </div>

    <div className="
    bg-black/40
    border
    border-zinc-800
    rounded-2xl
    p-5
    ">

      <h3 className="text-cyan-400 font-bold">
        Smart Analytics
      </h3>

      <p className="text-zinc-500 mt-2">
        Monitor clicks, devices,
        browsers and visitor trends.
      </p>

    </div>

    <div className="
    bg-black/40
    border
    border-zinc-800
    rounded-2xl
    p-5
    ">

      <h3 className="text-green-400 font-bold">
        QR Integration
      </h3>

      <p className="text-zinc-500 mt-2">
        Instantly create QR codes for
        every shortened URL.
      </p>

    </div>

  </div>

</div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-2xl text-white font-bold mb-2">
  Share Your Feedback
</h2>

<p className="text-zinc-400 mb-6">
  Tell us what features you'd like to
  see next or report any issues.
</p>

          <textarea
            rows="8"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Share your ideas..."
            className="w-full bg-black border border-zinc-700 text-white p-4 rounded-lg"
          />

          <button
            onClick={
              submitHandler
            }
            className="mt-5 px-6 py-3 bg-yellow-400 text-black font-semibold"
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
          </button>

        </div>

      </div>
<Footer/>
    </div>
  );
}

export default Feedback;