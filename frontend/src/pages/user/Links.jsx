import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaCopy,
  FaQrcode,
} from "react-icons/fa";
import gsap from "gsap";
import UserNavbar from "../../components/user/UserNavbar";
import PageHeader from "../../components/user/PageHeader";

import CreateLinkModal from "../../components/modals/CreateLinkModal";
import EditLinkModal from "../../components/modals/EditLinkModal";
import QRModal from "../../components/modals/QRModal";

import {
  getMyLinks,
  deleteLink,
} from "../../services/linkService";
import Footer from "../../components/Footer";

function Links() {
  const [links, setLinks] =
    useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const [showQRModal,
    setShowQRModal] =
    useState(false);

  const [selectedLink,
    setSelectedLink] =
    useState(null);

  const [qrCode,
    setQrCode] =
    useState("");
    
  const cardsRef = useRef(null);

  const loadLinks =
    async () => {
      try {
        const data =
          await getMyLinks();

        setLinks(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadLinks();
  }, []);
useEffect(() => {
  if (links.length > 0) {
gsap.fromTo(
  ".link-card",
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
  }
);
  }
}, [links]);
  const handleDelete =
    async (id) => {
      try {
        await deleteLink(id);

        loadLinks();
      } catch (error) {
        console.log(error);
      }
    };

  const copyLink = (url) => {
    navigator.clipboard.writeText(
      url
    );

    alert("Link Copied");
  };

  const openQR = (qr) => {
    setQrCode(qr);

    setShowQRModal(true);
  };

  return (
    <div className="min-h-screen bg-black">

      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

<div className="
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
">

  <div className="
  flex
  flex-col
  lg:flex-row
  justify-between
  items-center
  gap-8
  ">

    <div>

      <h1 className="
      text-3xl
      md:text-4xl
      font-black
      leading-none
      ">
        <span className="text-yellow-400">
          My
        </span>{" "}
        <span className="text-white">
          Links
        </span>
      </h1>

      <p className="
      text-zinc-400
      text-lg
      mt-5
      max-w-xl
      ">
        Manage, monitor and optimize your
        shortened URLs from one place.
      </p>

    </div>

    <button
      onClick={() =>
        setShowModal(true)
      }
      className="
      px-8
      py-4
      rounded-2xl
      bg-gradient-to-r
      from-yellow-400
      to-cyan-400
      text-black
      font-bold
      text-lg
      hover:scale-105
      transition-all
      "
    >
      + Create Link
    </button>

  </div>

</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

    <p className="text-zinc-500">
      Total Links
    </p>

    <h2 className="text-white text-3xl font-bold mt-2">
      {links.length}
    </h2>

  </div>

  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

    <p className="text-zinc-500">
      Total Clicks
    </p>

    <h2 className="text-cyan-400 text-3xl font-bold mt-2">
      {links.reduce(
        (a, b) => a + b.clicks,
        0
      )}
    </h2>

  </div>

</div>

        {links.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-10 text-center">

            <h2 className="text-2xl text-white">
              No Links Yet
            </h2>

            <p className="text-zinc-400 mt-3">
              Create your first
              shortened URL.
            </p>

          </div>
        ) : (
          <div className="grid gap-5">

            {links.map((link) => (
              <div
  key={link._id}
 className="
link-card
group
rounded-3xl
border
border-zinc-800
bg-zinc-950
p-7
transition-all
duration-300
hover:border-cyan-400/40
hover:-translate-y-1
"
>

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div className="flex-1">

                    <h3
  className="
  text-white
  text-2xl
  font-bold
  tracking-wide
  group-hover:text-cyan-300
  transition
"
>

                      {link.title}

                    </h3>
                    <div className="flex gap-2 mt-3">

  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
    {link.category}
  </span>

  <span
    className={`px-3 py-1 rounded-full text-xs ${
      link.isPublic
        ? "bg-green-500/10 text-green-400"
        : "bg-yellow-500/10 text-yellow-400"
    }`}
  >
    {link.isPublic
      ? "Public"
      : "Private"}
  </span>

</div>

                    <p className="text-zinc-500 mt-2 break-all">

                      {link.originalUrl}

                    </p>

                    <a
  href={link.shortUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="text-cyan-400 mt-3 break-all hover:text-cyan-300 transition"
>
  {link.shortUrl}
</a>

 <div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
mt-6
">

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Clicks
                        </p>

                        <p className="text-white">
                          {link.clicks}
                        </p>

                      </div>

                     
                      <div>

  <p className="text-zinc-500 text-sm">
    Expiry
  </p>

  <p className="text-white">
    {link.expiresAt
      ? new Date(
          link.expiresAt
        ).toLocaleDateString()
      : "Never"}
  </p>

</div>



                    </div>

                  </div>

<div className="
flex
flex-wrap
gap-2
items-center
justify-end
lg:w-[420px]
">

                    <button
                      onClick={() => {
                        setSelectedLink(
                          link
                        );

                        setShowEditModal(
                          true
                        );
                      }}
                      className="
px-4
py-2
rounded-xl
bg-gradient-to-r
from-yellow-400
to-yellow-300
text-black
font-semibold
hover:scale-105
transition
"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        copyLink(
                          link.shortUrl
                        )
                      }
                      className="
px-4
py-2
rounded-xl
bg-gradient-to-r
from-cyan-500
to-cyan-400
text-black
font-semibold
flex
items-center
gap-2
hover:scale-105
transition
"
                    >
                      <FaCopy />

                      Copy
                    </button>

                    <button
                      onClick={() =>
                        openQR(
                          link.qrCode
                        )
                      }
                     className="
px-4
py-2
rounded-xl
bg-gradient-to-r
from-purple-500
to-fuchsia-500
text-white
font-semibold
flex
items-center
gap-2
hover:scale-105
transition
"
                    >
                      <FaQrcode />

                      QR
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          link._id
                        )
                      }
                      className="
px-4
py-2
rounded-xl
bg-gradient-to-r
from-red-500
to-red-400
text-white
font-semibold
hover:scale-105
transition
"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <CreateLinkModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        refreshLinks={
          loadLinks
        }
      />

      <EditLinkModal
        isOpen={
          showEditModal
        }
        onClose={() =>
          setShowEditModal(false)
        }
        link={selectedLink}
        refreshLinks={
          loadLinks
        }
      />

      <QRModal
        isOpen={
          showQRModal
        }
        onClose={() =>
          setShowQRModal(false)
        }
        qrCode={qrCode}
      />
<Footer/>
    </div>
  );
}

export default Links;