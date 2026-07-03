import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getAllListings } from "../../services/listing";

function TenantDashboard() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8">
          <h1 className="mb-8 text-3xl font-bold">
            Available Listings
          </h1>

          {listings.length === 0 ? (
            <div className="rounded-xl bg-white p-6 shadow text-center">
              <p className="text-gray-500">
                No listings available.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  <h2 className="text-2xl font-bold">
                    {listing.title}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    📍 {listing.city}, {listing.state}
                  </p>

                  <p className="mt-2 font-semibold">
                    💰 ₹{listing.rent}/month
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/tenant/listing/${listing.id}`)
                    }
                    className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;