"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { TimeSlot } from "@/widgets/Timeline";
import { useAddToCart } from "@/hooks/carts/useAddToCart";

export function BookingDialogButton({ serviceId }: { serviceId: any }) {
  const addToCart = useAddToCart();

  const [qty, setQty] = useState(1);
  const [slot, setSlot] = useState<{ date: Date; time: string } | null>(null);

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));

  function handleSave() {
    console.log("🔥 ADDING TO CART");

    if (!slot?.time) {
      return alert("Please select a time slot");
    }

    const payload = {
      serviceId: serviceId,
      quantity: qty,
      date: slot.date.toISOString(),
      timeSlot: slot.time,
    };

    addToCart.mutate(payload, {
      onSuccess: () => {
        alert("Added to cart!");
      },
      onError: () => {
        alert("Failed to add to cart");
      },
    });

    console.log("Payload sent →", payload);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-fit">
        <DialogHeader>
          <DialogTitle>Choose a Time Slot</DialogTitle>
        </DialogHeader>

        <TimeSlot onSelectSlot={setSlot} />

        {/* Quantity */}
        <div className="grid gap-4 mt-4">
          <Label>Select Quantity</Label>

          <div className="flex items-center gap-4">
            <Button onClick={decrement} variant="outline" size="icon">
              –
            </Button>

            <div className="text-xl font-semibold w-10 text-center">{qty}</div>

            <Button onClick={increment} variant="outline" size="icon">
              +
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSave} disabled={addToCart.isPending}>
            {addToCart.isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
