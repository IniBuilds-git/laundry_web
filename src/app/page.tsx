"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Shirt, Truck, Clock, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-700 rounded-lg shadow-lg flex items-center justify-center transform transition-transform hover:scale-105">
                <span className="text-white font-bold text-xl">LR</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                LaundryRoom
              </span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hover:bg-purple-50 border-purple-600 text-purple-700"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-purple-700 hover:bg-purple-800 text-white shadow-md">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600">
              Professional Laundry Services
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Experience hassle-free laundry at your fingertips. Easily schedule,
            track, and get your clothes delivered—clean and fresh.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition"
              >
                Book Service Now
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-700 text-purple-700 hover:bg-purple-100 px-6 py-3 text-lg rounded-xl"
              >
                View Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 hover:border-purple-300">
            <CardHeader className="text-center">
              <Shirt className="h-12 w-12 text-purple-700 mx-auto mb-4 animate-pulse drop-shadow-glow" />
              <CardTitle className="text-lg font-bold text-gray-900">
                Professional Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Expert handling of all fabric types with premium cleaning
                solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 hover:border-purple-300">
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 text-purple-700 mx-auto mb-4 animate-pulse drop-shadow-glow" />
              <CardTitle className="text-lg font-bold text-gray-900">
                Pickup & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Convenient pickup and delivery services right to your doorstep.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 hover:border-purple-300">
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 text-purple-700 mx-auto mb-4 animate-pulse drop-shadow-glow" />
              <CardTitle className="text-lg font-bold text-gray-900">
                Fast Turnaround
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Standard 4–6 days delivery or express 1–2 days service
                available.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 hover:border-purple-300">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-purple-700 mx-auto mb-4 animate-pulse drop-shadow-glow" />
              <CardTitle className="text-lg font-bold text-gray-900">
                Secure & Reliable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Your clothes are safe with our insured and tracked service.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
