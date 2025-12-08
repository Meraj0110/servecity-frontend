"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { CategoryCard } from "./CategoryCard";
import { useGetCategories } from "@/hooks/categories/useGetCategories";

export default function CategoryCarousel() {
  const { data, isLoading } = useGetCategories();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="relative w-full py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
        Browse Categories
      </h1>

      <Carousel
        className="w-full"
        opts={{
          dragFree: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {data?.map((cat: any) => (
            <CarouselItem
              key={cat.id}
              className="basis-auto pr-6"
            >
              <CategoryCard
                id={cat.id}
                name={cat.categoryName}
                image={cat.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-black text-white hover:bg-gray-900" />
        <CarouselNext className="bg-black text-white hover:bg-gray-900" />
      </Carousel>
    </div>
  );
}
