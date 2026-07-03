import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getOwnerChats } from "../../services/message";

function Chats() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await getOwnerChats();
        setConversations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadChats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8">
          <h1 className="mb-8 text-3xl font-bold">
            Conversations
          </h1>

          {conversations.length === 0 ? (
            <div className="rounded-xl bg-white p-6 shadow">
              No conversations yet.
            </div>
          ) : (
            <div className="space-y-5">
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  <h2 className="text-xl font-bold">
                    {chat.interest.tenant.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {chat.interest.listing.title}
                  </p>

                  <button
                    onClick={() => navigate(`/chat/${chat.id}`)}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Open Chat
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

export default Chats;