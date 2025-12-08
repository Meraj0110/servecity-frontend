"use client";

import Image from "next/image";

export default function WorkerCardUC({ worker }: { worker: any }) {
  if (!worker) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white border rounded-xl">
      <div className="relative w-14 h-14 rounded-full overflow-hidden">
        <Image
          src={worker.avatar || "/default-user.png"}
          alt={worker.fullName}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <p className="font-semibold">{worker.fullName}</p>
        <p className="text-sm text-neutral-500">{worker.phone}</p>
      </div>
    </div>
  );
}
