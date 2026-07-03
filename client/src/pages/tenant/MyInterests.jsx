import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getSentInterests } from "../../services/interest";

function MyInterests() {
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await getSentInterests();
        setInterests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterests();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8">
          <h1 className="mb-8 text-3xl font-bold">
            My Interests
          </h1>

          {interests.length === 0 ? (
            <div className="rounded-xl bg-white p-6 shadow">
              No interests yet.
            </div>
          ) : (
            <div className="space-y-5">
              {interests.map((interest) => (
                <div
                  key={interest.id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  <h2 className="text-xl font-bold">
                    {interest.listing.title}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {interest.listing.city}, {interest.listing.state}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹{interest.listing.rent}/month
                  </p>

                  <p className="mt-3">
                    Status:
                    <span className="ml-2 font-bold">
                      {interest.status}
                    </span>
                  </p>

                  {interest.status === "ACCEPTED" &&
                    interest.conversation && (
                      <button
                        onClick={() =>
                          navigate(`/chat/${interest.conversation.id}`)
                        }
                        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white"
                      >
                        Open Chat
                      </button>
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

export default MyInterests;