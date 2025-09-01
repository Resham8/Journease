"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./button";
import { DateRange } from "react-day-picker";

interface Calendar02Props {
  value?: DateRange | undefined;
  onChange?: (value: DateRange | undefined) => void;
}

export function Calendar02({ value, onChange }: Calendar02Props) {
  const [open, setOpen] = React.useState(false);  

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full py-5 justify-between font-normal "
          >
            {value?.from ? (
              value.to ? (
                <>
                  {value.from.toLocaleDateString()} - {value.to.toLocaleDateString()}
                </>
              ) : (
                `${value.from.toLocaleDateString()} →`
              )
            ) : (
              "Select dates"
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={value}
            onSelect={onChange}
            defaultMonth={value?.from}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}