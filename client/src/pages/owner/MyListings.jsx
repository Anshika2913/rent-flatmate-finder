import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getMyListings,
  markListingFilled,
} from "../../services/listing";

function MyListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchListings = async () => {
    try {
      const response = await getMyListings();
      setListings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchListings();
}, []);

  const refreshListings = async () => {
  try {
    const response = await getMyListings();
    setListings(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const handleFill = async (id) => {
  try {
    await markListingFilled(id);
    await refreshListings();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              My Listings
            </h1>

            <button
              onClick={() => navigate("/owner/create-listing")}
              className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              + Create Listing
            </button>
          </div>

          <div className="space-y-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {listing.title}
                    </h2>

                    <p className="mt-2 text-gray-500">
                      📍 {listing.city}, {listing.state}
                    </p>

                    <p className="mt-2 font-semibold">
                      💰 ₹{listing.rent}/month
                    </p>

                    <span
                      className={`mt-3 inline-block rounded-full px-3 py-1 text-sm ${
                        listing.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/owner/edit-listing/${listing.id}`)}
                      className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    {listing.status === "ACTIVE" && (
                      <button
                        onClick={() => handleFill(listing.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Mark Filled
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {listings.length === 0 && (
              <div className="rounded-xl bg-white p-8 text-center shadow">
                <p className="text-gray-500">
                  No listings found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyListings;