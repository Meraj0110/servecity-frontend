import { Button } from "@/components/ui/button";

export default function CartButton() {
  const price = 100;

  return (
    <div className="flex items-center justify-center mt-5">
      <Button className="w-[50%]">
        <span className="w-full flex justify-between">
          <span>₹ {price}</span>
          <span>View Cart</span>{" "}
        </span>
      </Button>
    </div>
  );
}
