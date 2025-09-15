"use client";
import { useEffect, useState } from "react";

import ItineraryCard, { ItineraryData } from "@/components/ItineraryCard";

export default function Itinerary() {
  const [data, setData] = useState<ItineraryData | undefined>();

  useEffect(() => {
    const stored = sessionStorage.getItem("itinerary");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse itinerary:", err);
      }
    }
  }, []);

  return <ItineraryCard itineraryData={data} />;
}
