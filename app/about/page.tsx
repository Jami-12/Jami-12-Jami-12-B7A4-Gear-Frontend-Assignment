import Link from "next/link";
import {
  ShieldCheck,
  RefreshCw,
  Truck,
  Users,
  Award,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-sm font-bold tracking-wider text-[#1A73E8] uppercase bg-blue-50 px-3 py-1 rounded-full">
            About GearUp 🏋️
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Empowering Your Fitness Journey, One Gear at a Time.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            GearUp is Bangladesh&apos;s premier platform for renting and
            purchasing premium fitness and sports equipment. We make
            high-quality gear accessible, affordable, and hassle-free.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-[#1A73E8] rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To eliminate the financial and spatial barriers of owning heavy
              gym equipment by offering a flexible rental marketplace alongside
              top-tier products for sale.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-[#1A73E8] rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To build a sustainable fitness ecosystem where everyone—from
              beginners to professional athletes—can access the best training
              tools anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose GearUp?
            </h2>
            <p className="text-slate-500">
              Built for fitness enthusiasts, by fitness enthusiasts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-[#1A73E8] rounded-lg flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">Verified Quality</h4>
              <p className="text-sm text-slate-500">
                Every piece of gear is sanitized and safety-tested before
                dispatch.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-[#1A73E8] rounded-lg flex items-center justify-center mx-auto">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">Flexible Rentals</h4>
              <p className="text-sm text-slate-500">
                Rent daily, weekly, or monthly. Upgrade or return whenever you
                want.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-[#1A73E8] rounded-lg flex items-center justify-center mx-auto">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">Doorstep Delivery</h4>
              <p className="text-sm text-slate-500">
                Hassle-free setup and pickup right at your home or studio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-[#1A73E8] rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">Community First</h4>
              <p className="text-sm text-slate-500">
                Join thousands of athletes transforming their homes into
                personal gyms.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#1A73E8] text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto">
            Explore our vast catalog of fitness gear and get started today with
            easy rental plans!
          </p>
          <Link href="/gear">
            <Button className="bg-white text-[#1A73E8] hover:bg-blue-50 font-semibold px-8 py-3 h-auto rounded-lg">
              Browse All Gear
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
