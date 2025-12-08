import CategoryCarousel from "@/widgets/categories/CategoryCarousel";

export default function Home() {
  return (
    <div className="px-4 my-[100px] ml-[100px]">
      <h1 className="text-4xl mt-6  font-bold mb-6">Categories</h1>
      <CategoryCarousel />
    </div>
  );
}
