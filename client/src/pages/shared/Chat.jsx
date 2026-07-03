import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getMessages,
  sendMessage,
} from "../../services/message";

function Chat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages(id);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [id]);

  const refreshMessages = async () => {
    try {
      const response = await getMessages(id);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await sendMessage(id, text);
      setText("");
      await refreshMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-white p-6 shadow">
          <h1 className="mb-6 text-2xl font-bold">
            Conversation
          </h1>

          <div className="mb-6 h-[400px] overflow-y-auto rounded border p-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="mb-4 rounded-lg bg-gray-100 p-3"
                >
                  <p className="font-semibold">
                    {msg.sender.name}
                  </p>

                  <p className="mt-1">
                    {msg.content}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border p-3"
            />

            <button
              onClick={handleSend}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;