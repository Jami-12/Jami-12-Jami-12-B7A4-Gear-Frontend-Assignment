"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, SlidersHorizontal, Dumbbell, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BrowseGearPage() {
  const [gears, setGears] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // 1. Fetch Categories & Gears from Backend safely
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_API ||
          process.env.NEXT_PUBLIC_BACKEND_API ||
          "http://localhost:5000/api";

        const cleanBaseUrl = baseUrl.replace(/\/$/, "");

        const [gearRes, categoryRes] = await Promise.all([
          fetch(`${cleanBaseUrl}/gear`, { cache: "no-store" }),
          fetch(`${cleanBaseUrl}/categories`, { cache: "no-store" }),
        ]);

        if (gearRes.ok) {
          const gearData = await gearRes.json();
          console.log("Fetched Gear Data Raw:", gearData); // Debugging Log

          // ব্যাকএন্ডের বিভিন্ন ধরনের রেসপন্স ফরম্যাট হ্যান্ডেল করা
          const loadedGears =
            gearData?.data?.gear ||
            gearData?.data?.gears ||
            gearData?.data?.result ||
            (Array.isArray(gearData?.data) ? gearData.data : []) ||
            (Array.isArray(gearData) ? gearData : []);

          setGears(loadedGears);
        } else {
          console.error("Failed to fetch gear status:", gearRes.status);
        }

        if (categoryRes.ok) {
          const categoryData = await categoryRes.json();
          const loadedCategories =
            categoryData?.data?.categories ||
            categoryData?.data ||
            (Array.isArray(categoryData) ? categoryData : []);

          setCategories(loadedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Safe Filter Logic
  const filteredGears = gears.filter((gear) => {
    // Search Matching
    const matchesSearch =
      (gear?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (gear?.brand || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (gear?.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    // Category Matching (Safe with Optional Category & Nested Category object)
    const gearCatId = gear?.categoryId || gear?.category?.id || gear?.category?._id;
    const matchesCategory =
      selectedCategoryId === "All" || gearCatId === selectedCategoryId;

    // Price Matching
    const matchesPrice = Number(gear?.dailyRate || 0) <= maxPrice;

    // Availability Matching
    const matchesAvailability = onlyAvailable
      ? Number(gear?.availableStock || 0) > 0 && gear?.status !== "OUT_OF_STOCK"
      : true;

    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse All Gear 🏋️
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Find and rent top-quality sports equipment for your next adventure.
            </p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search gear, brand or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition"
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1A73E8]" /> Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedCategoryId("All");
                  setSearchTerm("");
                  setMaxPrice(1000);
                  setOnlyAvailable(false);
                }}
                className="text-xs text-[#1A73E8] hover:underline font-medium cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Dynamic Categories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategoryId("All")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium cursor-pointer ${
                    selectedCategoryId === "All"
                      ? "bg-blue-50 text-[#1A73E8]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat: any) => (
                  <button
                    key={cat?.id || cat?._id}
                    onClick={() => setSelectedCategoryId(cat?.id || cat?._id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium cursor-pointer ${
                      selectedCategoryId === (cat?.id || cat?._id)
                        ? "bg-blue-50 text-[#1A73E8]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat?.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Max Daily Rate
                </label>
                <span className="text-sm font-bold text-[#1A73E8]">
                  ${maxPrice}/day
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1A73E8] cursor-pointer"
              />
            </div>

            {/* Availability Filter */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 text-[#1A73E8] rounded border-slate-300 focus:ring-[#1A73E8]"
                />
                <span className="text-sm font-medium text-slate-700">
                  In Stock Only
                </span>
              </label>
            </div>
          </div>

          {/* Dynamic Gear Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 animate-pulse"
                  >
                    <div className="w-full h-48 bg-slate-200 rounded-xl"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredGears.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Gear Found</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  No equipment matches your search criteria or no gear is currently listed on the backend.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGears.map((gear) => (
                  <div
                    key={gear.id || gear._id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image & Status Badge */}
                      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                        {gear.image ? (
                          <img
                            src={gear.image}
                            alt={gear.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Dumbbell className="w-10 h-10" />
                          </div>
                        )}

                        <div className="absolute top-3 right-3">
                          {Number(gear.availableStock) > 0 && gear.status !== "OUT_OF_STOCK" ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                              <CheckCircle className="w-3 h-3" /> In Stock ({gear.availableStock})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-rose-500/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                              <XCircle className="w-3 h-3" /> Out of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-2">
                          {gear.category?.name && (
                            <span className="text-xs font-bold text-[#1A73E8] bg-blue-50 px-2 py-0.5 rounded-md">
                              {gear.category.name}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-medium">
                            {gear.brand}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 group-hover:text-[#1A73E8] transition line-clamp-1">
                          {gear.name}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2">
                          {gear.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer / Price & Action */}
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-slate-900">
                          ${gear.dailyRate}
                        </span>
                        <span className="text-xs text-slate-400"> / day</span>
                      </div>

                      <Link href={`/gear/${gear.id || gear._id}`}>
                        <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer">
                          View Details
                        </Button>
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}