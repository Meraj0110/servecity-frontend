// src/widgets/services/SubCategoryList.tsx
"use client";

import { useSubCategories } from "@/hooks/categories/useSubCategories";

export default function SubCategoryList({
  categoryId,
}: {
  categoryId: string;
}) {
  const { subcategories, loading } = useSubCategories();

  if (loading) return <p className="text-sm text-neutral-500">Loading…</p>;

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">Subcategories</h2>

      <ul className="space-y-2">
        {subcategories.map((sub) => (
          <li key={sub.id} className="text-neutral-700 font-medium">
            {sub.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
