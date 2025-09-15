import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  Users,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Type definitions
interface Activity {
  time: "morning" | "afternoon" | "evening";
  title: string;
  details: string;
  costEstimate: number;
}

interface Day {
  day: number;
  date: string;
  activities: Activity[];
  dailyBudgetEstimate: number;
}

export interface ItineraryData {
  title: string;
  duration: string;
  totalBudget: number;
  tripType?: string;
  days: Day[];
  notes?: string;
}

interface ItineraryCardProps {
  itineraryData?: ItineraryData;
}

const ItineraryCard = ({ itineraryData }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  
  const getTimeIcon = (time: Activity["time"]): string => {
    switch (time) {
      case "morning":
        return "🌅";
      case "afternoon":
        return "☀️";
      case "evening":
        return "🌆";
      default:
        return "🕐";
    }
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const currentDay: Day | undefined = itineraryData?.itinerary.find(
    (d) => d.day === selectedDay
  );

  if (!itineraryData) {
    return <div>No itinerary data available</div>;
  }

  if (!currentDay) {
    return <div>Day not found</div>;
  } 

  return (
    <div
      className="max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
      style={{ backgroundColor: "#fff7f7" }}
    >
      <div className="text-white p-8" style={{ backgroundColor: "#f25f5c" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              🌍 {itineraryData.title}
            </h1>
            <div className="flex items-center gap-6 text-red-100">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {itineraryData.duration}
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />${itineraryData.totalBudgetEstimate}{" "}
                total
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {itineraryData.tripType || "Adventure"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {itineraryData.itinerary.map((day: Day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedDay === day.day
                  ? "text-white shadow-lg scale-105"
                  : "text-gray-600 hover:shadow-md"
              }`}
              style={{
                backgroundColor:
                  selectedDay === day.day ? "#f25f5c" : "#fff7f7",
              }}
            >
              <div className="text-center">
                <div className="text-sm">Day {day.day}</div>
                <div className="text-xs opacity-75">{formatDate(day.date)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold flex items-center gap-3"
            style={{ color: "#000000" }}
          >
            📅 Day {currentDay.day} - {formatDate(currentDay.date)}
          </h2>
          <div
            className="px-4 py-2 rounded-full font-semibold text-white"
            style={{ backgroundColor: "#f25f5c" }}
          >
            ${currentDay.dailyBudgetEstimate} budget
          </div>
        </div>

        <div className="space-y-6">
          {currentDay.activities.map((activity: Activity, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border"
              style={{ borderColor: "#fff7f7" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {getTimeIcon(activity.time)}
                    </span>
                    <div>
                      <div
                        className="text-sm font-medium uppercase tracking-wide"
                        style={{ color: "#f25f5c" }}
                      >
                        {activity.time}
                      </div>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: "#000000" }}
                      >
                        {activity.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {activity.details}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <div
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: "#f25f5c" }}
                  >
                    ${activity.costEstimate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {itineraryData.notes && (
          <div className="mt-8">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 border"
              style={{
                backgroundColor: "#fff7f7",
                borderColor: "#f25f5c",
              }}
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5" style={{ color: "#f25f5c" }} />
                <span className="font-semibold" style={{ color: "#000000" }}>
                  Travel Tips & Notes
                </span>
              </div>
              {showNotes ? (
                <ChevronUp className="w-5 h-5" style={{ color: "#f25f5c" }} />
              ) : (
                <ChevronDown className="w-5 h-5" style={{ color: "#f25f5c" }} />
              )}
            </button>

            {showNotes && (
              <div
                className="mt-4 rounded-2xl p-6 border animate-in slide-in-from-top duration-300"
                style={{
                  backgroundColor: "#fff7f7",
                  borderColor: "#f25f5c",
                }}
              >
                <div className="prose max-w-none">
                  <p className="leading-relaxed" style={{ color: "#000000" }}>
                    {itineraryData.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
