import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";

import { getOwnerDashboardData } from "../../services/dashboard";

function OwnerDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalListings: 0,
    totalInterests: 0,
    totalConversations: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getOwnerDashboardData();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name} 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your listings and interests.
          </p>

          {loading ? (
            <p className="mt-8 text-lg">Loading dashboard...</p>
          ) : (
            <div className="mt-10 grid grid-cols-3 gap-6">

              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">Total Listings</p>
                <h2 className="mt-3 text-4xl font-bold">
                  {stats.totalListings}
                </h2>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">Interests Received</p>
                <h2 className="mt-3 text-4xl font-bold">
                  {stats.totalInterests}
                </h2>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">Conversations</p>
                <h2 className="mt-3 text-4xl font-bold">
                  {stats.totalConversations}
                </h2>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default OwnerDashboard;