"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function BannerHomepage() {
  return (
    <div className="flex justify-center items-center">

    <Card className="w-[75%] bg-[#f6f1ea] border-none shadow-none rounded-xl overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row items-center justify-between">
        {/* LEFT SIDE TEXT */}
        <div className="w-full md:w-1/2 p-10 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-neutral-900">
            Macbook Repairing
          </h2>
          <p className="text-neutral-600 text-lg">
            Level up your Game with macbook repair
          </p>
          <Link href="/all-categories/1">
            <Button
              variant="default"
              className="bg-[#4d342e] hover:bg-[#3e2925] text-white px-6 py-4 w-fit rounded-lg"
              >
              Know more
            </Button>
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 relative p-6">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src="/homepage/m4.webp"
              alt="Wall Panel"
              fill
              className="object-cover"
              />
          </div>
        </div>
      </CardContent>
    </Card>
              </div>
  );
}
