"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LayoutDashboard, LogOut, Settings, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { getMeAction, logoutAction } from "@/service/auth";

// Navigation items
const navItems = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
];

export function Navbar({ user: initialUser }: { user?: any }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMeAction();
        console.log("Navbar getMe Response:", res); 
        if (res) {
          setUser(res);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchUser();
  }, []);

  // Safe Data Extraction
  const userData = user?.data?.result || user?.data?.user || user?.data || user;
  
  // Robust Login Check
  const isLoggedIn = Boolean(
    user?.success === true || (userData && (userData.email || userData.id || userData._id))
  );

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(null); 
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleUserMenuAction = (action: string) => {
    switch (action) {
      case "dashboard": {
        const role = userData?.role?.toUpperCase();
        if (role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (role === "PROVIDER") {
          router.push("/dashboard/provider");
        } else if (role === "CUSTOMER" || role === "TENANT") {
          router.push("/dashboard/customer");
        } else {
          router.push("/dashboard");
        }
        break;
      }
      case "profile":
        router.push("/dashboard/profile");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const userInitial = userData?.name
    ? userData.name[0].toUpperCase()
    : userData?.email
      ? userData.email[0].toUpperCase()
      : null;

  return (
    <nav className="border-b bg-white border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#1A73E8]"
            >
              <path
                d="M16 4L4 14V26H28V14L16 4Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 26V18H20V26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 12H18M14 15H18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 29H30"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold tracking-tight text-[#1E293B]">
              GearUp 🏋️
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#334155] hover:text-[#1A73E8] transition-colors text-[15px] font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Action Section */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200 text-[#1A73E8] font-bold hover:bg-blue-100 transition outline-none cursor-pointer">
                    {userInitial ? userInitial : <User className="w-5 h-5" />}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white p-2 rounded-xl shadow-lg border z-[100]"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {userData?.name || "User Profile"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {userData?.email}
                      </p>
                      {userData?.role && (
                        <span className="mt-1 w-max text-[10px] font-bold bg-blue-50 text-[#1A73E8] px-2 py-0.5 rounded-full uppercase">
                          {userData.role}
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1 border-b" />

                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onSelect={() => handleUserMenuAction(item.action)}
                        className="cursor-pointer py-2 px-2 hover:bg-slate-100 rounded-md transition flex items-center"
                      >
                        <Icon className="w-4 h-4 mr-2 text-slate-600" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator className="my-1 border-b" />

                  <DropdownMenuItem
                    onSelect={handleLogout}
                    className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 py-2 px-2 rounded-md transition flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-5 rounded-lg h-10 cursor-pointer"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium px-5 rounded-lg h-10 shadow-none cursor-pointer">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-[#1A73E8] text-base font-medium py-1.5 px-2 rounded-md hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-2 py-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {userData?.name || "User Profile"}
                  </p>
                  <p className="text-xs text-slate-500">{userData?.email}</p>
                </div>
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.action}
                      onClick={() => {
                        handleUserMenuAction(item.action);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 text-sm text-slate-700 py-2 px-2 rounded-md hover:bg-slate-50 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-sm text-red-600 py-2 px-2 rounded-md hover:bg-red-50 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Log in
                  </Button>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}