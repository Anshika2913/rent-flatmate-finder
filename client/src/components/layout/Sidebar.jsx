import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Dashboard
      </div>

      <nav className="flex flex-col p-4 gap-2">

        <Link
          to="/owner"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/owner/listings"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          My Listings
        </Link>

        <Link
          to="/owner/interests"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Interests
        </Link>

        <Link
          to="/owner/chats"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Chats
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;