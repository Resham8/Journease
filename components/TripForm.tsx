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
import {z} from "zod";
import { TripFormValues, tripSchema } from "@/lib/zodSchema";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateRange } from "react-day-picker";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [travlersOpen, setTravlersOpen] = useState(false);
  const [adultTravlers, setAdultTravlers] = useState(0);
  const [childTravlers, setChildTravlers] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
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
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

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
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="bg-white rounded-xl shadow-sm border p-8">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Destinations
                </Label>
                <Input placeholder="Spain, Tokyo, Greece..." className="h-11" {...register("destination")} />
                {errors.destination && (<p className="text-red-500 text-sm">
                    {errors.destination.message}
                  </p>)}
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
                      onChange={(newValue: DateRange | undefined) => field.onChange(newValue)}
                    />
                  )}
                />
                {errors.dates && <p className="text-red-500">{errors.dates.message}</p>}
                  
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
                      {adultTravlers + childTravlers > 0
                        ? `${adultTravlers + childTravlers} ${
                            adultTravlers + childTravlers === 1
                              ? "Traveler"
                              : "Travelers"
                          }`
                        : "Add Travelers"}
                      <User />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Adults</Label>
                        <Counter
                          count={adultTravlers}
                          setCount={setAdultTravlers}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Children</Label>
                        <Counter
                          count={childTravlers}
                          setCount={setChildTravlers}
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
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 justify-start gap-3 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <span className="text-lg">👤</span>
                    Solo
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start gap-3 hover:bg-pink-50 hover:border-pink-300"
                  >
                    <span className="text-lg">❤️</span>
                    Couple
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start gap-3 hover:bg-green-50 hover:border-green-300"
                  >
                    <span className="text-lg">👨‍👩‍👧‍👦</span>
                    Family
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start gap-3 hover:bg-yellow-50 hover:border-yellow-300"
                  >
                    <span className="text-lg">👯‍♂️</span>
                    Friends
                  </Button>
                </div>
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
                <TagInput />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Accommodation
                </Label>
                <div className="">
                  <SelectAccomodations />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Dietary Restrictions
                </Label>
                <div>
                  {dietaryPreferences.map((diets, index) => (
                    <div key={index} className="flex gap-2 space-y-2">
                      <Checkbox id={diets}></Checkbox>{" "}
                      <Label htmlFor={diets}>{diets}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 md:col-span-2 lg:col-span-1">
                <Label className="text-base font-medium flex items-center gap-2">
                  Accessibility
                </Label>
                <div>
                  {Accessibilities.map((accessibility, index) => (
                    <div key={index} className="flex gap-2 space-y-2">
                      <Checkbox id={accessibility}></Checkbox>
                      <Label htmlFor={accessibility}>{accessibility}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  Notes
                </Label>
                <Textarea placeholder="Type your Note here."></Textarea>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              
            </div>
          )}
          <div className="mt-8 flex justify-end gap-3">
            {currentStep < steps.length ? (
              <Button type="button" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
