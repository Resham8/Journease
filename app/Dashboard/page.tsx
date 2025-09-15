"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusCircle, MapPin, Calendar, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Travel Dashboard
              </h1>
              <p className="text-gray-600">Plan and manage your trips</p>
            </div>
            <Button
              onClick={() => router.push("/TravelForm")}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Trip
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Trips</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Travelers</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/TravelForm")}
                variant="outline"
                className="w-full justify-start"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Plan New Trip
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Browse Destinations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-950 to-[#f25f5c] rounded-lg shadow-lg p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">
              Ready for your next adventure?
            </h2>
            <p className="text-blue-100 mb-6">
              Create detailed travel plans, manage your itineraries, and make
              your trips unforgettable.
            </p>
            <Button
              onClick={() => router.push("/TravelForm")}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Planning
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
