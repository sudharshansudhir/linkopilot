import {
  useEffect,
  useState,
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import UserNavbar from "../../components/user/UserNavbar";
import PageHeader from "../../components/user/PageHeader";

import api from "../../services/api";
import Footer from "../../components/Footer";

function Analytics() {
  const [links, setLinks] =
    useState([]);

  const [selectedLink,
    setSelectedLink] =
    useState("");

  const [analytics,
    setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks =
    async () => {
      try {
        const { data } =
          await api.get("/links");

        setLinks(data.links);

        if (
          data.links.length > 0
        ) {
          loadAnalytics(
            data.links[0]._id
          );

          setSelectedLink(
            data.links[0]._id
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  const loadAnalytics =
    async (linkId) => {
      try {
        const { data } =
          await api.get(
            `/analytics/${linkId}`
          );

        setAnalytics(
          data.analytics
        );
      } catch (error) {
        console.log(error);
      }
    };

  const browserData =
    analytics?.browserStats?.map(
      (item) => ({
        name: item._id,
        value: item.count,
      })
    ) || [];

  const deviceData =
    analytics?.deviceStats?.map(
      (item) => ({
        name: item._id,
        value: item.count,
      })
    ) || [];

  const trendData =
    analytics?.dailyTrends || [];

  return (
    <div className="min-h-screen bg-black">

      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <PageHeader
          title="Analytics"
          subtitle="Deep insights into every shortened URL."
        />

        {/* SELECT LINK */}

        <div className="mb-8">

          <div className="mb-8">

  <label className="block text-zinc-400 mb-3 text-sm uppercase tracking-wider">
    Select Link
  </label>

  <div className="relative">

    <select
      value={selectedLink}
      onChange={(e) => {
        setSelectedLink(
          e.target.value
        );

        loadAnalytics(
          e.target.value
        );
      }}
      className="
      w-full
      md:w-[420px]
      appearance-none
      bg-zinc-950
      border
      border-cyan-500/20
      rounded-2xl
      px-5
      py-4
      text-white
      font-medium
      outline-none
      transition-all
      hover:border-cyan-400/50
      focus:border-cyan-400
      focus:shadow-[0_0_25px_rgba(34,211,238,0.15)]
      "
    >

      {links.map((link) => (
        <option
          key={link._id}
          value={link._id}
        >
          {link.title}
        </option>
      ))}

    </select>

    <div
      className="
      absolute
      right-5
      top-1/2
      -translate-y-1/2
      text-cyan-400
      pointer-events-none
      "
    >
      ▼
    </div>

  </div>

</div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-950 border border-yellow-400/30 rounded-xl p-6">

            <h3 className="text-zinc-400">
              Total Clicks
            </h3>

            <h1 className="text-5xl text-white mt-4">
              {
                analytics?.totalClicks
              }
            </h1>

          </div>

          <div className="bg-zinc-950 border border-cyan-400/30 rounded-xl p-6">

            <h3 className="text-zinc-400">
              Last Visited
            </h3>

            <p className="text-white mt-4">
              {
                analytics?.lastVisited
              }
            </p>

          </div>

          <div className="bg-zinc-950 border border-purple-400/30 rounded-xl p-6">

            <h3 className="text-zinc-400">
              Recent Visits
            </h3>

            <h1 className="text-5xl text-white mt-4">
              {
                analytics
                  ?.recentVisits
                  ?.length
              }
            </h1>

          </div>

        </div>

        {/* DAILY TREND */}

        <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-xl p-6">

          <h2 className="text-2xl text-white mb-6">
            Daily Click Trends
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer>

              <LineChart
                data={
                  trendData
                }
              >
                <XAxis
                  dataKey="_id"
                />

                <YAxis />

                <Tooltip />

                <Line
  type="monotone"
  dataKey="clicks"
  stroke="#22d3ee"
  strokeWidth={4}
  dot={{
    fill: "#facc15",
    r: 6,
  }}
/>

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BROWSER + DEVICE */}

        <div className="grid lg:grid-cols-2 gap-6 mt-10">

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">

            <h2 className="text-xl text-white mb-6">
              Browser Analytics
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={
                      browserData
                    }
                    dataKey="value"
                    outerRadius={
                      100
                    }
                  >
                    {browserData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={
                            index
                          }
                          fill={[
                            "#facc15",
                            "#22d3ee",
                            "#a855f7",
                            "#10b981",
                          ][
                            index %
                              4
                          ]}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">

            <h2 className="text-xl text-white mb-6">
              Device Analytics
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={
                      deviceData
                    }
                    dataKey="value"
                    outerRadius={
                      100
                    }
                  >
                    {deviceData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={
                            index
                          }
                          fill={[
                            "#22d3ee",
                            "#facc15",
                            "#10b981",
                            "#a855f7",
                          ][
                            index %
                              4
                          ]}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>
<div className="grid md:grid-cols-3 gap-6 mt-10">

  <div className="bg-zinc-950 border border-yellow-400/20 rounded-3xl p-6">

    <h3 className="text-yellow-400 font-semibold mb-4">
      Engagement Score
    </h3>

    <h1 className="text-5xl font-black text-white">
      {analytics?.totalClicks > 50
        ? "A+"
        : analytics?.totalClicks > 20
        ? "B+"
        : "C"}
    </h1>

    <p className="text-zinc-400 mt-3">
      Based on total clicks.
    </p>

  </div>

  <div className="bg-zinc-950 border border-cyan-400/20 rounded-3xl p-6">

    <h3 className="text-cyan-400 font-semibold mb-4">
      Top Browser
    </h3>

    <h1 className="text-3xl font-black text-white">
      {browserData?.[0]?.name || "N/A"}
    </h1>

    <p className="text-zinc-400 mt-3">
      Most visitors use this browser.
    </p>

  </div>

  <div className="bg-zinc-950 border border-purple-400/20 rounded-3xl p-6">

    <h3 className="text-purple-400 font-semibold mb-4">
      Top Device
    </h3>

    <h1 className="text-3xl font-black text-white">
      {deviceData?.[0]?.name || "N/A"}
    </h1>

    <p className="text-zinc-400 mt-3">
      Dominant traffic source.
    </p>

  </div>

</div>
        {/* RECENT VISITS */}

<div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-xl p-6">

  <h2 className="text-2xl text-white mb-6">
    Recent Visitors
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr className="border-b border-zinc-800">

          <th className="p-4 text-left text-yellow-400">
            Browser
          </th>

          <th className="p-4 text-left text-yellow-400">
            Device
          </th>

          <th className="p-4 text-left text-yellow-400">
            OS
          </th>

          <th className="p-4 text-left text-yellow-400">
            Country
          </th>

          <th className="p-4 text-left text-yellow-400">
            Visited
          </th>

        </tr>

      </thead>

      <tbody>

        {analytics?.recentVisits?.map(
          (visit) => (
            <tr
              key={visit._id}
              className="border-b border-zinc-900"
            >

              <td className="p-4 text-white">
                {visit.browser}
              </td>

              <td className="p-4 text-white">
                {visit.device}
              </td>

              <td className="p-4 text-white">
                {visit.os}
              </td>

              <td className="p-4 text-white">
                {visit.country}
              </td>

              <td className="p-4 text-zinc-400">
                {new Date(
                  visit.visitedAt
                ).toLocaleString()}
              </td>

            </tr>
          )
        )}

      </tbody>

    </table>

  </div>

</div>

      </div>
<Footer/>
    </div>
  );
}

export default Analytics;