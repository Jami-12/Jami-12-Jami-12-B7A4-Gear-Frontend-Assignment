import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Clock, Sparkles, CheckCircle2 } from "lucide-react";

async function getFeaturedGear() {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL || "http://localhost:5000/api"}/gear?limit=4`,
      { cache: "no-store" }
    );
    const data = await res.json();

    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching featured gear:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredGear = await getFeaturedGear();
  const gearList = Array.isArray(featuredGear) ? featuredGear : [];

  return (
    <div className="space-y-16 py-8">
      {/* ⚪ Clean White Background Hero Section */}
      <section className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 mx-4 md:mx-12 shadow-sm">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4" /> Instant Equipment Rental
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Rent Premium Sports & Outdoor Gear <span className="text-blue-600">Instantly</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Skip buying expensive gear for short-term use. Rent verified, high-quality sports and outdoor equipment directly from trusted local providers in your area.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/gear"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-md shadow-blue-600/10"
            >
              Explore Gear <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/register"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold transition"
            >
              Become a Provider
            </Link>
          </div>
        </div>

        {/* 🎨 Clean Feature Card */}
        <div className="w-full md:w-5/12 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Why Choose GearUp?</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Zero Maintenance Cost</p>
                <p className="text-xs text-slate-500">Use top gear without worrying about long-term upkeep.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Verified Quality</p>
                <p className="text-xs text-slate-500">Inspected by providers before every pickup.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Flexible Daily Rates</p>
                <p className="text-xs text-slate-500">Pay only for the exact duration you need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-8 border rounded-2xl space-y-3 bg-white shadow-sm hover:shadow-md transition">
          <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-xl text-slate-900">Verified Gear</h3>
          <p className="text-slate-600 text-sm leading-relaxed">All equipment is thoroughly inspected by providers before listing.</p>
        </div>
        <div className="p-8 border rounded-2xl space-y-3 bg-white shadow-sm hover:shadow-md transition">
          <Clock className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-xl text-slate-900">Flexible Rentals</h3>
          <p className="text-slate-600 text-sm leading-relaxed">Rent by the day with instant booking and flexible duration.</p>
        </div>
        <div className="p-8 border rounded-2xl space-y-3 bg-white shadow-sm hover:shadow-md transition">
          <Truck className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-xl text-slate-900">Easy Pickup</h3>
          <p className="text-slate-600 text-sm leading-relaxed">Pick up gear directly from trusted local providers in your area.</p>
        </div>
      </section>

      {/* 🏷️ Featured Gear Section */}
      <section className="container mx-auto px-6 space-y-8">
        <div className="flex justify-between items-end border-b pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Equipment</h2>
            <p className="text-sm text-slate-500 mt-1">Browse available gear for your next trip</p>
          </div>
          <Link href="/gear" className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1">
            View All Equipment →
          </Link>
        </div>

        {gearList.length === 0 ? (
          <div className="p-12 text-center border rounded-2xl bg-white text-slate-500">
            No gear items available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gearList.map((gear: any) => (
              <div 
                key={gear._id || gear.id} 
                className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                      {gear.brand || "Generic"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {gear.category || "Gear"}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-slate-900 line-clamp-2 leading-snug">
                    {gear.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {gear.description || "High quality gear available for short term and long term rentals."}
                  </p>
                </div>

                <div className="pt-4 border-t flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Rate</span>
                    <span className="text-xl font-extrabold text-slate-900">${gear.dailyRate}</span>
                    <span className="text-xs text-slate-500">/day</span>
                  </div>
                  <Link 
                    href={`/gear/${gear._id || gear.id}`}
                    className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}