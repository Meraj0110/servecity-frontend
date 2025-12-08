"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function AddChips() {
  const [chips, setChips] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const addChip = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setChips([...chips, trimmed]);
    setValue("");
  };

  const removeChip = (index: number) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto space-y-3">
      <div className="flex flex-wrap gap-2 border rounded-lg p-3 min-h-[56px]">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm"
          >
            {chip}
            <button onClick={() => removeChip(index)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Input inside chip box */}
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addChip();
            }
          }}
          placeholder="Type and press Enter"
          className="border-0 shadow-none flex-1 p-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
