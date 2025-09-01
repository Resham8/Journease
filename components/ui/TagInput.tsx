"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";
import { X } from "lucide-react";

function TagInput({ className, ...props }: React.ComponentProps<"div">) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim()) {
      event.preventDefault();
      const newTag = tagInput.trim();
            

      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
        
    if (event.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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
        {tags.map((tag, index) => (
          <TagItem 
            key={index} 
            text={tag} 
            onRemove={() => removeTag(index)}
          />
        ))}
        
        <input 
          type="text" 
          className="outline-none border-none bg-transparent flex-1 min-w-[120px] h-8 px-1" 
          value={tagInput} 
          onChange={(e) => setTagInput(e.target.value)} 
          placeholder={tags.length === 0 ? "Add tags..." : "Add another tag"}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

function TagItem({ 
  text, 
  className, 
  onRemove 
}: { 
  text: string; 
  className?: string; 
  onRemove: () => void;
}) {
  return (
    <span className={cn(
      "inline-flex h-7 items-center gap-1 px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium",
      className
    )}>
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