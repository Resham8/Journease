"use client";
import { useState } from "react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "./Stepper";
import { Button } from "./ui/button";
import { Calendar02 } from "./ui/Calendar02";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Counter from "./ui/Counter";
import { Banknote, Calendar, MapPin, User, Users } from "lucide-react";
import { TagInput } from "./ui/TagInput";
import SelectAccomodations from "./SelectAccomodation";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { TripFormValues, tripSchema } from "@/lib/zodSchema";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Alerts from "./Alerts";

const steps = [
  {
    step: 1,
    title: "Trip Basics",
  },
  {
    step: 2,
    title: "Preferences",
  },
  {
    step: 3,
    title: "Quick overview",
  },
];

const dietaryPreferences = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
];
const Accessibilities = [
  "Wheelchair Accessible",
  "Senior-Friendly",
  "Service Animal Allowed",
  "Accessible Parking",
  "Accessible Restrooms",
];

export default function TripForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [travlersOpen, setTravlersOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      travelers: { adults: 0, children: 0 },
      dietaryRestrictions: [],
      accessibility: [],
      interests: [],
    },
  });

  const next = () => {
    if (currentStep < steps.length) {
      setCurrentStep((step) => step + 1);
    }
  };

  const onSubmit: SubmitHandler<TripFormValues> = async (data) => {
    console.log("Form Data:", data);

    const transformed = {
      destination: data.destination,
      startDate: data.dates.from,
      endDate: data.dates.to,
      duration:
        data.dates.from && data.dates.to
          ? Math.ceil(
              (+data.dates.to - +data.dates.from) / (1000 * 60 * 60 * 24)
            )
          : 0,
      travelers: data.travelers.adults + data.travelers.children,
      travelType: data.travelerType,
      budget: data.budget,

      preferences: {
        interests: data.interests,
        accommodation: data.accommodation,
        dietaryRestrictions: data.dietaryRestrictions,
        accessibility: data.accessibility,
        additionalNotes: data.notes,
      },

      totalCost: 0,
      totalActivities: 0,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/trips",transformed);
      console.log(res.data);
      sessionStorage.setItem("itinerary", JSON.stringify(res.data.Itinerary));
      router.push("/Itinerary");
    } catch (error) {
      console.log(error)
    }

    <Alerts title="Form submitted successfully!" description="" variant="default"/>
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    alert("Form has validation errors. Check console for details.");
  };

  const watchedTravelers = watch("travelers");
  const totalTravelers =
    (watchedTravelers?.adults || 0) + (watchedTravelers?.children || 0);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center w-full py-10">
        <Stepper
          value={currentStep}
          onValueChange={setCurrentStep}
          defaultValue={1}
          className="max-w-[600px]"
        >
          {steps.map(({ step, title }) => (
            <StepperItem
              key={step}
              step={step}
              className="max-md:items-start [&:not(:last-child)]:flex-1"
            >
              <StepperTrigger className="max-md:flex-col">
                <StepperIndicator />
                <div className="text-center md:text-left">
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </StepperTrigger>
              {step < steps.length && (
                <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>
      <form
        className="max-w-6xl mx-auto px-6"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="bg-white rounded-xl shadow-sm border p-8">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Destinations
                </Label>
                <Input
                  placeholder="Spain, Tokyo, Greece..."
                  className="h-11"
                  {...register("destination")}
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm">
                    {errors.destination.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Dates
                </Label>
                <div className="h-11">
                  <Controller
                    name="dates"
                    control={control}
                    render={({ field }) => (
                      <Calendar02
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    )}
                  />
                  {errors.dates && (
                    <p className="text-red-500">{errors.dates.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Travelers
                </Label>
                <Popover open={travlersOpen} onOpenChange={setTravlersOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-11 justify-between font-normal"
                    >
                      {totalTravelers > 0
                        ? `${totalTravelers} ${
                            totalTravelers === 1 ? "Traveler" : "Travelers"
                          }`
                        : "Add Travelers"}
                      <User />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Adults</Label>
                        <Controller
                          name="travelers.adults"
                          control={control}
                          render={({ field }) => (
                            <Counter
                              count={field.value}
                              setCount={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Children</Label>
                        <Controller
                          name="travelers.children"
                          control={control}
                          render={({ field }) => (
                            <Counter
                              count={field.value}
                              setCount={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3 md:col-span-2 lg:col-span-1">
                <Label className="text-base font-medium flex items-center gap-2">
                  Traveler Type
                </Label>
                <Controller
                  name="travelerType"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-3">
                      {["solo", "couple", "family", "friends"].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={field.value === type ? "default" : "outline"}
                          className="h-12 justify-start gap-3 hover:bg-blue-50 hover:border-blue-300 capitalize"
                          onClick={() => field.onChange(type)}
                        >
                          <span className="text-lg">
                            {type === "solo"
                              ? "👤"
                              : type === "couple"
                              ? "❤️"
                              : type === "family"
                              ? "👨‍👩‍👧‍👦"
                              : "👯‍♂️"}
                          </span>
                          {type}
                        </Button>
                      ))}
                    </div>
                  )}
                />
                {errors.travelerType && (
                  <p className="text-red-500">{errors.travelerType.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-blue-600" />
                  Budget
                </Label>
                <Input
                  type="number"
                  placeholder="Enter your budget"
                  className="h-11"
                  {...register("budget", { valueAsNumber: true })}
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Interests
                </Label>
                <Controller
                  name="interests"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <TagInput value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.interests && (
                  <p className="text-red-500">{errors.interests.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Accommodation
                </Label>
                <div className="">
                  <Controller
                    name="accommodation"
                    control={control}
                    render={({ field }) => (
                      <SelectAccomodations
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Dietary Restrictions
                </Label>
                <div>
                  <Controller
                    name="dietaryRestrictions"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {dietaryPreferences.map((diet) => {
                          const isChecked =
                            field.value?.includes(diet) || false;
                          return (
                            <div key={diet} className="flex items-center gap-2">
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      diet,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter((d) => d !== diet)
                                    );
                                  }
                                }}
                              />
                              <Label>{diet}</Label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3 md:col-span-2 lg:col-span-1">
                <Label className="text-base font-medium flex items-center gap-2">
                  Accessibility
                </Label>
                <div>
                  <Controller
                    name="accessibility"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {Accessibilities.map((acc) => {
                          const isChecked = field.value?.includes(acc) || false;
                          return (
                            <div key={acc} className="flex items-center gap-2">
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      acc,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter((a) => a !== acc)
                                    );
                                  }
                                }}
                              />
                              <Label>{acc}</Label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Notes
                </Label>
                <Textarea
                  placeholder="Type your Note here."
                  {...register("notes")}
                ></Textarea>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Review Your Trip</h2>
              </div>
              <div className="grid gap-4">
                <div className="flex gap-2.5">
                  <Label>Destination</Label>
                  <p className="capitalize">{getValues("destination")}</p>
                </div>
                <div className="flex gap-2.5">
                  <Label>Dates</Label>
                  <p>
                    {getValues("dates.from")?.toLocaleDateString()} -{" "}
                    {getValues("dates.to")?.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <Label>Travlers</Label>
                  <p>
                    {getValues("travelers").adults || 0} Adultes,{" "}
                    {getValues("travelers").children || 0} Children
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <Label>Budget</Label>
                  <p>{getValues("budget")}</p>
                </div>
                <div className="">
                  <h3 className="text-center font-medium text-xl">
                    Prefrences
                  </h3>
                  <p className="flex gap-2.5">
                    <Label>Interests: </Label>{" "}
                    {getValues("interests")?.join(", ") || "None"}
                  </p>
                  <p className="flex gap-2.5">
                    <Label>Accomodations: </Label>{" "}
                    {getValues("accommodation") || "Not selected"}
                  </p>
                  <p className="flex gap-2.5">
                    <Label>Dietary: </Label>{" "}
                    {getValues("dietaryRestrictions")?.join(", ") || "None"}
                  </p>
                  <p className="flex gap-2.5">
                    <Label>Accesebility: </Label>{" "}
                    {getValues("accessibility")?.join(", ") || "None"}
                  </p>
                  <p className="flex gap-2.5">
                    <Label>Notes: </Label> {getValues("notes") || "No notes"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-end gap-3">
            {currentStep < steps.length ? (
              <Button type="button" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            )}
          </div>         
        </div>
      </form>
    </div>
  );
}
