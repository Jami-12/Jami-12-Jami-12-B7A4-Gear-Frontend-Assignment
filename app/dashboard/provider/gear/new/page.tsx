"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createGearAction } from "@/service/gear";

export default function AddGearPage() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    categoryId: "", // Optional
    condition: "GOOD",
    description: "",
    dailyRate: "",
    stock: "1",
    specifications: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const router = useRouter();

  // Categories Fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetchingCategories(true);
        const baseUrl =
          process.env.BACKEND_API_URL || "http://localhost:5000/api";

        const cleanBaseUrl = baseUrl.replace(/\/$/, "");
        const res = await fetch(`${cleanBaseUrl}/categories`);

        if (res.ok) {
          const result = await res.json();
          const categoryList = Array.isArray(result)
            ? result
            : result?.data?.categories || result?.data || [];

          setCategories(categoryList);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ImgBB Image Upload
  const uploadImageToImgBB = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        { method: "POST", body: formData },
      );
      const data = await res.json();
      return data?.data?.url || "";
    } catch {
      return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl =
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32";

    if (selectedFile) {
      const uploadedUrl = await uploadImageToImgBB(selectedFile);
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    const rate = Number(form.dailyRate) || 0;
    const stockQty = Number(form.stock) || 1;

    // 🎯 categoryId সিলেক্ট না করা হলে undefined যাবে
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      brand: form.brand.trim(),
      dailyRate: rate,
      stock: stockQty,
      availableStock: stockQty,
      condition: form.condition,
      image: finalImageUrl,
      specifications: form.specifications.trim() || undefined,
      categoryId: form.categoryId.trim() ? form.categoryId : undefined,
      status: "AVAILABLE",
    };

    const data = await createGearAction(payload);
    setLoading(false);

    if (data?.success) {
      alert("Gear added successfully!");
      router.push("/dashboard/provider");
      router.refresh();
    } else {
      const errorMsg =
        typeof data?.message === "object"
          ? JSON.stringify(data.message, null, 2)
          : data?.message || "Failed to add gear.";
      alert(errorMsg);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Add New Equipment</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200/80 p-6 rounded-xl space-y-4 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Gear Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sony Alpha A7 III"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Brand *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sony"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category (Optional)
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Select Category (None)</option>
              {fetchingCategories ? (
                <option value="" disabled>
                  Loading categories...
                </option>
              ) : (
                categories.map((cat: any) => (
                  <option key={cat.id || cat._id} value={cat.id || cat._id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Condition *
            </label>
            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
            >
              <option value="NEW">NEW</option>
              <option value="EXCELLENT">EXCELLENT</option>
              <option value="GOOD">GOOD</option>
              <option value="FAIR">FAIR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Stock Qty *
            </label>
            <input
              type="number"
              required
              min="1"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Daily Rate ($) *
          </label>
          <input
            type="number"
            required
            min="1"
            placeholder="e.g. 45"
            value={form.dailyRate}
            onChange={(e) => setForm({ ...form, dailyRate: e.target.value })}
            className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Description *
          </label>
          <textarea
            required
            placeholder="Detailed description about the gear..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Specifications (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. 24.2MP Sensor, 4K Video, Includes 2 Batteries"
            value={form.specifications}
            onChange={(e) =>
              setForm({ ...form, specifications: e.target.value })
            }
            className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Select Image from Device
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-lg text-sm cursor-pointer"
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 text-sm cursor-pointer"
        >
          {loading ? "Publishing..." : "Create Gear Listing"}
        </button>
      </form>
    </div>
  );
}
