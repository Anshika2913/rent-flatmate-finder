import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

function TenantChats() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Tenant Chats
          </h1>

          <p className="mt-4">
            Chats will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TenantChats;