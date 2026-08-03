"use client";

import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900">Get in Touch</h1>
          <p className="text-slate-600">
            Have questions about gear rentals, pricing, or partnerships? We’re here to help you out.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-4 lg:col-span-1">
            
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-[#1A73E8] rounded-lg shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Our Location</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Level 4, Dhanmondi 27, Dhaka - 1209, Bangladesh
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-[#1A73E8] rounded-lg shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Email Us</h4>
                <p className="text-sm text-slate-500 mt-1">support@gearup.com</p>
                <p className="text-sm text-slate-500">info@gearup.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-[#1A73E8] rounded-lg shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Call Us</h4>
                <p className="text-sm text-slate-500 mt-1">+880 1700-000000</p>
                <p className="text-sm text-slate-500">+880 1900-000000</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-[#1A73E8] rounded-lg shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Working Hours</h4>
                <p className="text-sm text-slate-500 mt-1">Sun - Thu: 9:00 AM - 8:00 PM</p>
                <p className="text-sm text-slate-500">Friday & Saturday: Closed</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1A73E8] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1A73E8] text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Rental inquiry / Gear availability"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1A73E8] text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1A73E8] text-sm resize-none"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}