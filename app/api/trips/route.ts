import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";

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
    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //call ai
    const Itinerary = await callAi(body);

    return NextResponse.json(
      { Itinerary },
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

function cleanResponse(text:string) {
  if (typeof text !== "string") {
    text = JSON.stringify(text); 
  }
  return text.replace(/```json|```/g, "").trim();
}

async function callAi(userData: any) {
  const api_key = process.env.DEEPSEEK_API;
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        {
          role: "system",
          content: `You are a travel planner AI. 
          Always return a JSON itinerary that covers ALL days from "dates.from" to "dates.to".
          Include at least 3 activities per day. 
          The "notes" field is a freeform text string. 
          You may include travel advice, recommendations, tips, or warnings.
          Structure:
          {
            title:""
              {
                "day": number,
                "date": "YYYY-MM-DD",
                "activities": [
                  { "time": "morning", "title": "...", "details": "...", "costEstimate": number },
                  { "time": "afternoon", "title": "...", "details": "...", "costEstimate": number },
                  { "time": "evening", "title": "...", "details": "...", "costEstimate": number }
                ],
                "dailyBudgetEstimate": number
              }
            
            "totalBudgetEstimate": number,
            "notes": string
          }`,
        },
        { role: "user", content: JSON.stringify(userData) },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content = response.data.choices[0].message.content;
  const cleaned = cleanResponse(content);
  const data = JSON.parse(cleaned);
  return data;
}
