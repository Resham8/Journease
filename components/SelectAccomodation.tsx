import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SelectAccomodations() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select accommodation" />
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
