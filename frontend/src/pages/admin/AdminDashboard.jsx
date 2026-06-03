import {
  useEffect,
  useState,
} from "react";
import Footer from "../../components/Footer";
import {
  FaUsers,
  FaLink,
  FaChartLine,
  FaCommentDots,
} from "react-icons/fa";
import {
  getAdminDashboard,
  getAllUsers,
  getTopLinks,
  getTopUsers,
} from "../../services/adminService";
import FeedbackSection from "../../components/admin/FeedbackSection";
function AdminDashboard() {
  const [stats, setStats] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [topLinks,
    setTopLinks] =
    useState([]);

  const [topUsers,
    setTopUsers] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        const dashboard =
          await getAdminDashboard(
            token
          );

        const usersData =
          await getAllUsers(
            token
          );

        const topLinksData =
          await getTopLinks(
            token
          );

        const topUsersData =
          await getTopUsers(
            token
          );

        setStats(
          dashboard.stats
        );

        setUsers(
          usersData
        );

        setTopLinks(
          topLinksData
        );

        setTopUsers(
          topUsersData
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}

<section className="p-6">

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
    to-yellow-950/20
    p-10
    "
  >

    <div className="flex justify-between items-center flex-wrap gap-6">

      <div>

        <h1 className="text-5xl md:text-7xl font-black">

          <span className="text-yellow-400">
            Admin
          </span>{" "}

          <span className="text-white">
            Command Center
          </span>

        </h1>

        <p className="text-zinc-400 mt-5 text-lg">

          Monitor users, links,
          analytics and platform growth.

        </p>

      </div>

      <button
        onClick={() => {
          localStorage.removeItem(
            "adminToken"
          );

          window.location.href =
            "/admin/login";
        }}
        className="
        px-6
        py-3
        rounded-2xl
        border
        border-red-500/30
        text-red-400
        hover:bg-red-500/10
        "
      >
        Logout
      </button>

    </div>

  </div>

</section>

      {/* STATS */}

      <section className="p-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-zinc-950 border border-yellow-400/30 rounded-xl p-6">

            <div className="flex items-center gap-3">

  <FaUsers className="text-yellow-400" />

  <h3>Total Users</h3>

</div>

            <h1 className="text-4xl mt-3">
              {stats?.totalUsers || 0}
            </h1>

          </div>

          <div className="bg-zinc-950 border border-cyan-400/30 rounded-xl p-6">

            <h3>Total Links</h3>

            <h1 className="text-4xl mt-3">
              {stats?.totalLinks || 0}
            </h1>

          </div>

          <div className="bg-zinc-950 border border-purple-500/30 rounded-xl p-6">

            <h3>Total Clicks</h3>

            <h1 className="text-4xl mt-3">
              {stats?.totalClicks || 0}
            </h1>

          </div>

          <div className="bg-zinc-950 border border-green-500/30 rounded-xl p-6">

            <h3>Feedback</h3>

            <h1 className="text-4xl mt-3">
              {stats?.totalFeedback || 0}
            </h1>

          </div>

        </div>

      </section>

      {/* USERS */}

      <section className="p-6">

        <h2 className="text-3xl mb-6 text-yellow-400">
          Users
        </h2>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-800">

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map(
                (user) => (
                  <tr
                    key={
                      user._id
                    }
                    className="
border-b
border-zinc-900
hover:bg-zinc-900/40
transition
"
                  >
                    <td className="p-4">
                      {
                        user.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        user.email
                      }
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* TOP LINKS */}

      <section className="p-6">

        <h2 className="text-3xl mb-6 text-cyan-400">
          Top Links
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          {topLinks.map(
            (link) => (
              <div
                key={link._id}
                className="
bg-zinc-950
border
border-cyan-500/10
rounded-3xl
p-6
hover:border-cyan-400/40
transition
"
              >
       
                <h3 className="text-xl">
                  {link.title}
                </h3>

                <p className="text-zinc-400 mt-2">
                  Clicks :
                  {" "}
                  {link.clicks}
                </p>

              </div>
            )
          )}

        </div>

      </section>

      {/* TOP USERS */}

      <section className="p-6 pb-20">

        <h2 className="text-3xl mb-6 text-purple-400">
          Top Users
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          {topUsers.map(
            (user) => (
              <div
                key={
                  user.userId
                }
                className="
bg-zinc-950
border
border-cyan-500/10
rounded-3xl
p-6
hover:border-cyan-400/40
transition
"
              >

                <h3>
                  {user.name}
                </h3>

                <p className="text-zinc-400 mt-2">
                  Total Links :
                  {" "}
                  {
                    user.totalLinks
                  }
                </p>

                <p className="text-zinc-400">
                  Total Clicks :
                  {" "}
                  {
                    user.totalClicks
                  }
                </p>

              </div>
            )
          )}

        </div>

      </section>

    <FeedbackSection />
    <Footer/>
    </div>
  );
}

export default AdminDashboard;