import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { createListing } from "../../services/listing";

function CreateListing() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    city: "",
    state: "",
    roomType: "PRIVATE",
    furnished: "FURNISHED",
    availableFrom: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createListing({
        ...formData,
        rent: Number(formData.rent),
        availableFrom: new Date(formData.availableFrom).toISOString(),
      });

      toast.success("Listing created successfully");

      navigate("/owner/listings");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create listing"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar />

        <div className="mx-auto max-w-4xl p-8">
          <h1 className="mb-8 text-3xl font-bold">
            Create Listing
          </h1>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-8 shadow space-y-6"
          >
            <input
              name="title"
              placeholder="Listing Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border p-3"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="rent"
                placeholder="Monthly Rent"
                value={formData.rent}
                onChange={handleChange}
                className="rounded-lg border p-3"
                required
              />

              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="rounded-lg border p-3"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="rounded-lg border p-3"
                required
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="rounded-lg border p-3"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="rounded-lg border p-3"
              >
                <option value="PRIVATE">Private Room</option>
                <option value="SHARED">Shared Room</option>
              </select>

              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                className="rounded-lg border p-3"
              >
                <option value="FURNISHED">Furnished</option>
                <option value="SEMI_FURNISHED">Semi Furnished</option>
                <option value="UNFURNISHED">Unfurnished</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;