import { z } from "zod";
import type { DateRange } from "react-day-picker";

const dateRangeSchema: z.ZodType<DateRange> = z.object({
  from: z.union([z.date(), z.undefined()]),
  to: z.union([z.date(), z.undefined()]).optional(),
});

export const tripSchema = z.object({
  destination: z.string().min(2, "Destination is required"),
  dates: dateRangeSchema,
  travelers: z.object({
    adults: z.number().min(0),
    children: z.number().min(0),
  }),
  travelerType: z.enum(["solo", "couple", "family", "friends"]),
  budget: z.number().min(0, "Budget must be positive"),
  interests: z.array(z.string()).optional(),
  accommodation: z.string().optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  accessibility: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type TripFormValues = z.infer<typeof tripSchema>;