import {
  useEffect,
  useState,
  useRef,
} from "react";

import gsap from "gsap";

import {
  FaFire,
  FaTrophy,
  FaMousePointer,
} from "react-icons/fa";

import UserNavbar from "../../components/user/UserNavbar";

import { getTrendingLinks } from "../../services/trendingService";
import Footer from "../../components/Footer";

function Trending() {
  const [links, setLinks] =
    useState([]);

  const [category,
    setCategory] =
    useState("All");

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending =
    async () => {
      try {
        const data =
          await getTrendingLinks();

        setLinks(data);
      } catch (error) {
        console.log(error);
      }
    };

  const categories = [
    "All",
    ...new Set(
      links.map(
        (link) =>
          link.category
      )
    ),
  ];

  const filteredLinks =
    category === "All"
      ? links
      : links.filter(
          (link) =>
            link.category ===
            category
        );

  return (
    <div className="min-h-screen bg-black">

      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

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

  <div className="flex justify-between items-center flex-wrap gap-6">

    <div>

      <h1
        className="
        text-5xl
        md:text-7xl
        font-black
      "
      >
        <span className="text-yellow-400">
          Trending
        </span>{" "}
        <span className="text-white">
          Links
        </span>
      </h1>

      <p className="text-zinc-400 mt-5 text-lg">
        Discover the most clicked and
        hottest public URLs.
      </p>

    </div>

    <FaFire className="text-7xl text-yellow-400/40" />

  </div>

</div>

        {/* CATEGORY FILTER */}

        <div className="flex flex-wrap gap-3 mb-10">

          {categories.map(
            (cat) => (
              <button
                key={cat}
                onClick={() =>
                  setCategory(cat)
                }
               className={`
px-5
py-3
rounded-2xl
font-medium
transition-all
${
  category === cat
    ? "bg-gradient-to-r from-yellow-400 to-cyan-400 text-black"
    : "bg-zinc-950 border border-zinc-800 text-white hover:border-cyan-400/40"
}
`}
              >
                {cat}
              </button>
            )
          )}

        </div>

        {/* TOP LINKS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredLinks.map(
            (
              link,
              index
            ) => (
              <div
                key={link._id}
                className="
trend-card
group
relative
overflow-hidden
rounded-3xl
border
border-zinc-800
bg-zinc-950
p-6
transition-all
duration-300
hover:border-cyan-400/40
hover:-translate-y-2
"
              >

                <div className="flex justify-between items-center">

                 <div
  className="
  w-12
  h-12
  rounded-2xl
  bg-gradient-to-r
  from-yellow-400
  to-cyan-400
  flex
  items-center
  justify-center
  text-black
  font-black
"
>
  #{index + 1}
</div>

                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">

                    {
                      link.category
                    }

                  </span>

                </div>

                <h3 className="text-xl text-white mt-5">

                  {link.title}

                </h3>

                <p className="text-zinc-500 mt-2 break-all">

                  {
                    link.shortUrl
                  }

                </p>

                <div className="mt-6 flex justify-between items-center">

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Total Clicks
                    </p>

                  <div className="flex items-center gap-2">

  <FaMousePointer className="text-cyan-400" />

  <p className="text-cyan-400 text-3xl font-black">
    {link.clicks}
  </p>

</div>

                  </div>

               <div
  className="
  flex
  items-center
  gap-2
  text-yellow-400
  font-semibold
"
>
  <FaFire />
  Trending
</div>

                </div>

              </div>
            )
          )}

        </div>

      </div>
<Footer/>
    </div>
  );
}

export default Trending;