import { connectDB } from "@/lib/mongoose";
import { Trip } from "@/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION DEBUG:", session);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const body = await req.json();
    const { itinerary, aiPrompt, aiResponse } = body;
    const userId = session.user.id;

    if (!userId || !itinerary) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTrip = await Trip.create({
      userId,
      itinerary,
      aiPrompt,
      aiResponse,
    });

    return NextResponse.json(
      { message: "Trip created successfully", trip: newTrip },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}
