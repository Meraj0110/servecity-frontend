"use client";

import { useProductForm } from "@/hooks/useProductForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { ImageUpload } from "@/widgets/dashboard/ImageUpload";
import { api } from "@/lib/api";
import { AddChips } from "@/widgets/dashboard/AddChipsTag";
import { useState } from "react";
import { LoadingButton } from "@/widgets/LoadingButton";

export default function ProductAddPage() {
  const productForm = useProductForm();
  const { product, handleChange, setProductField, getFormData } = productForm;
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPublishing(true);

    try {
      const formData = getFormData();
      const res = await api.post("/products/create", formData);
      console.log("RESP:", res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* LEFT SIDE — MAIN FORM */}
      <div className="lg:col-span-2 space-y-6">
        {/* PRODUCT DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label>Name</Label>
              <Input
                id="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                id="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                id="productStock"
                type="number"
                value={product.productStock}
                onChange={handleChange}
              />
            </div>

            {/* ❌ Removed Original Cost UI */}
          </CardContent>
        </Card>

        {/* PRODUCT IMAGES */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>

          <CardContent>
            <ImageUpload productForm={productForm} />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">
        {/* PRICING */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Base Price</Label>
              <Input
                type="number"
                value={product.productOriginalCost}
                onChange={(e) =>
                  setProductField("productOriginalCost", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Selling Price</Label>
              <Input
                type="number"
                value={product.productSellingCost}
                onChange={(e) =>
                  setProductField("productSellingCost", e.target.value)
                }
              />
            </div>

            <div className="flex items-center justify-between border rounded-md px-3 py-2">
              <span className="text-sm">In Stock</span>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>

        {/* TAGS (instead of Categories) */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>

          <CardContent>
            <AddChips
              tags={product.tags || []}
              setTags={(val) => setProductField("tags", val)}
            />
          </CardContent>
        </Card>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          <Button type="button" variant="outline">
            Save Draft
          </Button>

          {isPublishing ? (
            <LoadingButton loading={isPublishing} />
          ) : (
            <Button type="submit" className="w-full">
              Publish
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
