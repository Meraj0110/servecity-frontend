// widgets/services/ServiceSelector.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetServices } from "@/hooks/categories/useGetServices";
import { useSubCategories } from "@/hooks/categories/useSubCategories";

export default function ServiceSelector({
  categoryId,
}: {
  categoryId: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const { subcategories, fetchSubcategories } = useSubCategories();


  useEffect(() => {
    fetchSubcategories(categoryId);
  }, [categoryId]);


  return (
    <Card className="rounded-3xl border border-neutral-200 shadow-sm p-6">
      <CardHeader className="pb-6 pt-0">
        <div className="flex items-center gap-4">
          <CardTitle className="text-lg font-semibold text-neutral-800">
            Select a service
          </CardTitle>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-y-10 select-none">
          {subcategories.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className="flex flex-col items-center group"
            >
              <Image
                src={s.image}
                width={80}
                height={80}
                alt={s.title}
                className="rounded-xl object-cover w-20 h-20"
              />

              <span className="mt-3 text-sm text-neutral-800 text-center leading-tight w-20">
                {s.title}
              </span>

              {selected === s.id && (
                <div className="mt-1 h-[2px] w-10 bg-neutral-900 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
