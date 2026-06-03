import {
  FaGithub,
  FaLinkedin,
  FaRocket,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="
      mt-20
      border-t
      border-zinc-800
      bg-black
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-8
          "
        >
          {/* LEFT */}

          <div className="text-center md:text-left">

            <div className="flex items-center gap-3 justify-center md:justify-start">

              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-gradient-to-r
                from-yellow-400
                to-cyan-400
                flex
                items-center
                justify-center
                "
              >
                <FaRocket className="text-black" />
              </div>

              <div>

                <h3 className="text-white font-bold text-lg">
                  Link-O-Pilot
                </h3>

                <p className="text-zinc-500 text-sm">
                  Smart URL Intelligence Platform
                </p>

              </div>

            </div>

            <p className="text-zinc-500 mt-4 max-w-md">
              Shorten links, generate QR codes,
              track analytics and monitor
              performance through a modern
              SaaS dashboard.
            </p>

          </div>

          {/* CENTER */}

          <div className="text-center">

            <p className="text-zinc-400">
              Built with React • Node.js •
              Express • MongoDB
            </p>

            <p className="text-zinc-600 text-sm mt-2">
              © {new Date().getFullYear()} Link-O-Pilot.
              All rights reserved.
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex gap-4">

            <a
              href="https://github.com/sudharshansudhir"
              className="
              w-10
              h-10
              rounded-xl
              bg-zinc-900
              flex
              items-center
              justify-center
              text-zinc-400
              hover:text-yellow-400
              transition
              "
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/sudharshan-r-ssr"
              className="
              w-10
              h-10
              rounded-xl
              bg-zinc-900
              flex
              items-center
              justify-center
              text-zinc-400
              hover:text-cyan-400
              transition
              "
            >
              <FaLinkedin />
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;