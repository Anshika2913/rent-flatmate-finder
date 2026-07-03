import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getReceivedInterests,
  acceptInterest,
  declineInterest,
} from "../../services/interest";

function Interests() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
  const fetchInterests = async () => {
    try {
      const response = await getReceivedInterests();
      setInterests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchInterests();
}, []);

  const refreshInterests = async () => {
  const response = await getReceivedInterests();
  setInterests(response.data);
};

const handleAccept = async (id) => {
  try {
    await acceptInterest(id);
    toast.success("Interest accepted");
    await refreshInterests();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

const handleDecline = async (id) => {
  try {
    await declineInterest(id);
    toast.success("Interest declined");
    await refreshInterests();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8">
          <h1 className="mb-8 text-3xl font-bold">
            Interests Received
          </h1>

          {interests.length === 0 ? (
            <div className="rounded-xl bg-white p-6 shadow">
              No interests received yet.
            </div>
          ) : (
            <div className="space-y-6">
              {interests.map((interest) => (
                <div
                  key={interest.id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  <h2 className="text-xl font-bold">
                    {interest.tenant.name}
                  </h2>

                  <p>{interest.tenant.email}</p>

                  <p className="mt-2 text-gray-500">
                    Listing: {interest.listing.title}
                  </p>

                  <p className="mt-2">
                    Status:
                    <span className="ml-2 font-bold">
                      {interest.status}
                    </span>
                  </p>

                  {interest.status === "PENDING" && (
                    <div className="mt-5 flex gap-4">
                      <button
                        onClick={() => handleAccept(interest.id)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleDecline(interest.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interests;