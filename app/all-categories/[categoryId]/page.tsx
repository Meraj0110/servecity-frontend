// src/widgets/services/ServicesPage.tsx
"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import ServiceSelector from "@/widgets/services/ServiceSelector";
import SubCategoryList from "@/widgets/categories/SubCategoryList";
import ServiceCard from "@/widgets/categories/ServiceCard";
import CartButton from "@/widgets/services/CartButton";
import VideoPreview from "@/widgets/categories/VideoPreview";
import { useSubCategories } from "@/hooks/categories/useSubCategories";
import { useGetServices } from "@/hooks/categories/useGetServices";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useGetCategory } from "@/hooks/categories/useGetCategory";

export default function ServicesPage() {
  const { categoryId } = useParams();
  const { fetchSubcategories } = useSubCategories();
  const { services, fetchServices } = useGetServices();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategory(categoryId);

  useEffect(() => {
    fetchSubcategories(categoryId);
    fetchServices(categoryId);

    console.log("id is ", categoryId);
  }, [categoryId]);

  return (
    <div className="flex justify-center gap-16 mt-28 px-6">
      {/* LEFT COLUMN */}
      <div className="w-[30%] space-y-6">
        <ServiceSelector categoryId={categoryId} />
        <CartButton />
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-[55%] flex flex-col gap-8">
        <VideoPreview videoUrl={categoryData?.videoUrl} />

        <h2 className="text-2xl font-bold mt-2">Combos</h2>

        <div className="flex flex-col gap-4">
          {services.map((srv) => (
            <>
              <h1 className="text-2xl font-bold">{srv.subCategoryTitle}</h1>
              {srv?.services.map((ss) => (
                <ServiceCard key={ss.id} service={ss} />
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
