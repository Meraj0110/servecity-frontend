import CartButton from "@/widgets/services/CartButton";
import { ClassicCleaningCard } from "@/widgets/services/ServiceCard";
import ServiceSelector from "@/widgets/services/ServiceSelector";

export default function App() {
  return (
    <div className="flex justify-center mt-[10rem]  gap-16 ">
      <div className="w-[33%]">
        <ServiceSelector />
        <CartButton />
      </div>
      <div className="w-[50%] gap-y-2 flex flex-col">
        <ClassicCleaningCard />
        <ClassicCleaningCard />

        <ClassicCleaningCard />
        <ClassicCleaningCard />
      </div>
    </div>
  );
}
