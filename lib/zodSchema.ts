import { z } from "zod";

export const tripStep1Schema = z.object({
  destination: z.string().min(1, "Destination is required"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  travelers: z.number().min(1, "At least 1 travler required"),
  travelType: z.enum(["solo", "couple", "family", "friends"]),
  budget: z.number().min(50, "Budget must be at least 50")
});

export const tripStep2Schema = z.object({
  preferences: z.object({
    interests: z.array(z.string()).optional(),
    accommodation: z.string().optional(),
    dietaryRestrictions: z.array(z.string()).optional(),
    accessibility: z.array(z.string()).optional(),
    additionalNotes: z.string().optional(),
  }),
});

export const tripStep3Schema = z.object({
  duration: z.number().min(1, "Duration must be at least 1 day"),
  totalCost: z.number().default(0),
  totalActivities: z.number().default(0),
});

// export const tripFinalSchema = z.object({
//   status: z.enum(["generating", "completed", "failed"]).default("generating"),
// });


export const tripSchema = tripStep1Schema.and(tripStep2Schema).and(tripStep3Schema);