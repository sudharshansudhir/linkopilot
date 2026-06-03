import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaLink,
  FaChartLine,
  FaRocket,
  FaMousePointer,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import UserNavbar from "../../components/user/UserNavbar";
import PageHeader from "../../components/user/PageHeader";
import StatCard from "../../components/user/StatCard";

import api from "../../services/api";
import Footer from "../../components/Footer";

function Dashboard() {
  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const dashboardRef =
    useRef(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from(
        ".dashboard-card",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease:
            "power3.out",
        }
      );
    }
  }, [loading]);

  const fetchDashboard =
    async () => {
      try {
        const { data } =
          await api.get(
            "/analytics/dashboard"
          );

        setAnalytics(
          data.analytics
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-white mt-4">
            Loading Command Center...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-5 py-8">

        {/* HERO */}

        <PageHeader
          title="Command Center"
          subtitle="Monitor, manage and grow your URL ecosystem with powerful analytics."
          action={
            <button
            onClick={() => navigate("/links")}
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-xl
                bg-gradient-to-r
                from-yellow-400
                to-cyan-400
                text-black
                font-semibold
                hover:scale-105
                transition-all
              "
            >
              
              Manage Link
            </button>
          }
        />

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="dashboard-card">
            <StatCard
              title="Total Links"
              value={
                analytics?.totalLinks ||
                0
              }
              icon={<FaLink />}
              color="yellow"
            />
          </div>

          <div className="dashboard-card">
            <StatCard
              title="Total Clicks"
              value={
                analytics?.totalClicks ||
                0
              }
              icon={
                <FaMousePointer />
              }
              color="cyan"
            />
          </div>

          <div className="dashboard-card">
            <StatCard
              title="Active Links"
              value={
                analytics?.activeLinks ||
                0
              }
              icon={<FaRocket />}
              color="green"
            />
          </div>

          <div className="dashboard-card">
            <StatCard
              title="Recent Links"
              value={
                analytics
                  ?.recentLinks
                  ?.length || 0
              }
              icon={
                <FaChartLine />
              }
              color="purple"
            />
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="dashboard-card mt-8">

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <button className="bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-5 text-left">
                <p className="text-yellow-400 font-semibold">
                  Create Link
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  Shorten a new URL
                </p>
              </button>

              <button className="bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-5 text-left">
                <p className="text-cyan-400 font-semibold">
                  Analytics
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  Track performance
                </p>
              </button>

              <button className="bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-5 text-left">
                <p className="text-green-400 font-semibold">
                  Trending
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  Explore top links
                </p>
              </button>

            </div>

          </div>

        </div>

        {/* RECENT LINKS */}

        <div className="dashboard-card mt-8">

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            {analytics
              ?.recentLinks
              ?.length === 0 ? (
              <div className="text-center py-10 text-zinc-500">
                No recent activity
              </div>
            ) : (
              <div className="space-y-4">

                {analytics?.recentLinks?.map(
                  (link) => (
                    <div
                      key={
                        link._id
                      }
                      className="
                        border
                        border-zinc-800
                        rounded-xl
                        p-5
                        hover:border-cyan-500/40
                        transition-all
                      "
                    >
                      <div className="flex justify-between items-center flex-wrap gap-3">

                        <div>

                          <h3 className="font-semibold text-lg">
                            {
                              link.title
                            }
                          </h3>

                          <p className="text-cyan-400 text-sm break-all mt-1">
                            {
                              link.shortUrl
                            }
                          </p>

                        </div>

                        <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                          Active
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;