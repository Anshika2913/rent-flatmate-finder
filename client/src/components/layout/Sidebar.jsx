import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="w-60 min-h-screen bg-slate-900 p-6 text-white">
      <h1 className="mb-10 text-3xl font-bold">Dashboard</h1>

      <div className="space-y-3">
        {user?.role === "OWNER" ? (
          <>
            <Link
              to="/owner"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              Dashboard
            </Link>

            <Link
              to="/owner/listings"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              My Listings
            </Link>

            <Link
              to="/owner/interests"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              Interests
            </Link>

            <Link
              to="/owner/chats"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              Chats
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/tenant"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              Dashboard
            </Link>

            <Link
              to="/tenant/interests"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              My Interests
            </Link>

            <Link
              to="/tenant/chats"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              Chats
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;