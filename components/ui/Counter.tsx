import { Button } from "./button";

type CounterProps = {
  variant?: "default" | "destructive" | "secondary" | "ghost" | "link" | "outline";
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Counter({ variant, count, setCount }: CounterProps) {

  return (
    <div className="flex justify-center items-center gap-1 bg-secondary w-fit p-1 rounded-lg">
      <Button variant={variant} onClick={() => setCount((c) => c + 1)}>
        +
      </Button>
      <div className="px-1.5">{count}</div>
      <Button variant={variant} onClick={() => setCount((c) => Math.max(0, c - 1))}>
        -
      </Button>
    </div>
  );
}
