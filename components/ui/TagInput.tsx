"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  className?: string;
  placeholder?: string;
}

function TagInput({
  className,
  value = [],
  onChange,
  placeholder,
  ...props
}: TagInputProps) {
  
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim()) {
      event.preventDefault();
      const newTag = tagInput.trim();

      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setTagInput("");
    }

    if (event.key === "Backspace" && !tagInput && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div
      className={cn(
        "border-input placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center flex-wrap gap-2 w-full">
        {value.map((tag, index) => (
          <TagItem key={index} text={tag} onRemove={() => removeTag(index)} />
        ))}

        <input
          type="text"
          className="outline-none border-none bg-transparent flex-1 min-w-[120px] h-8 px-1"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder={value.length === 0 ? "Add tags..." : "Add another tag"}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

function TagItem({
  text,
  className,
  onRemove,
}: {
  text: string;
  className?: string;
  onRemove: () => void;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1 px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium",
        className
      )}
    >
      <span>{text}</span>
      <button
        type="button"
        onClick={onRemove}
        className="flex items-center justify-center w-4 h-4 text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-muted"
        aria-label={`Remove ${text} tag`}
      >
        <X size={12} />
      </button>
    </span>
  );
}

export { TagInput };
