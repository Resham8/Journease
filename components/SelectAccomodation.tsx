import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,  
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectAccommodationsProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SelectAccomodations(  {value, 
  onChange, 
  placeholder = "Select accommodation",  
}: SelectAccommodationsProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>          
          <SelectItem value="hotel">Hotel</SelectItem>
          <SelectItem value="hostel">Hostel</SelectItem>
          <SelectItem value="airbnb">Airbnb</SelectItem>
          <SelectItem value="camping">Camping</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
