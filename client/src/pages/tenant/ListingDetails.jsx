import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getListingById } from "../../services/listing";
import { sendInterest } from "../../services/interest";
import { generateCompatibility } from "../../services/compatibility";

function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [compatibility, setCompatibility] = useState(null);
  const [loadingScore, setLoadingScore] = useState(false);

  const [interestSent, setInterestSent] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(id);
        setListing(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleCompatibility = async () => {
    try {
      setLoadingScore(true);

      const response = await generateCompatibility(id);

      setCompatibility(response.data);

      toast.success("Compatibility generated!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to generate compatibility"
      );
    } finally {
      setLoadingScore(false);
    }
  };

  const handleInterest = async () => {
    try {
      await sendInterest(id);

      setInterestSent(true);

      toast.success("Interest sent successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to send interest"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Listing not found.
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="mx-auto max-w-4xl p-8">
          <div className="rounded-xl bg-white p-8 shadow">

            <h1 className="text-3xl font-bold">
              {listing.title}
            </h1>

            <p className="mt-2 text-gray-500">
              📍 {listing.city}, {listing.state}
            </p>

            <p className="mt-6 text-gray-700">
              {listing.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">

              <div>
                <p className="font-semibold">Rent</p>
                <p>₹ {listing.rent}/month</p>
              </div>

              <div>
                <p className="font-semibold">Room Type</p>
                <p>{listing.roomType}</p>
              </div>

              <div>
                <p className="font-semibold">Furnished</p>
                <p>{listing.furnished}</p>
              </div>

              <div>
                <p className="font-semibold">Available From</p>
                <p>
                  {new Date(
                    listing.availableFrom
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="mt-8 flex gap-4">

              <button
                onClick={handleCompatibility}
                disabled={loadingScore}
                className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 disabled:bg-purple-300"
              >
                {loadingScore
                  ? "Generating..."
                  : "Check Compatibility"}
              </button>

              <button
                onClick={handleInterest}
                disabled={interestSent}
                className={`rounded-lg px-6 py-3 text-white ${
                  interestSent
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {interestSent
                  ? "Interest Sent ✓"
                  : "I'm Interested ❤️"}
              </button>

            </div>

            {compatibility && (
              <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">

                <h2 className="text-2xl font-bold text-blue-800">
                  Compatibility Score
                </h2>

                <p className="mt-4 text-5xl font-bold text-blue-700">
                  {compatibility.score}%
                </p>

                <p className="mt-4 text-gray-700">
                  {compatibility.explanation}
                </p>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;