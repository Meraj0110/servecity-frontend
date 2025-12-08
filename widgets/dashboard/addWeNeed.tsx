"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export function WeeNeed() {
  const [items, setItems] = useState<string[]>([""]);

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const addItem = (index?: number) => {
    if (index !== undefined) {
      // Insert below current row
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      setItems(newItems);
    } else {
      // Add at bottom
      setItems([...items, ""]);
    }
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold mb-4">WeeNeed</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* Input */}
            <Input
              placeholder="Enter requirement"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1"
            />

            {/* Add Row Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => addItem(index)}
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* Remove Row Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
