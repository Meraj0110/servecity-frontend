"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

export function ImageUpload({ serviceForm }: any) {
  const {
    previewUrls,
    fileInputRef,
    handleFileInput,
    handleThumbnailClick,
    handleRemoveImage,
  } = serviceForm;

  return (
    <div className="w-full space-y-4 border rounded-xl p-4 shadow-sm">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />

      {/* EMPTY STATE */}
      {!previewUrls.length ? (
        <div
          onClick={handleThumbnailClick}
          className="h-64 w-full flex flex-col items-center justify-center 
          border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/30 transition"
        >
          <ImagePlus className="h-7 w-7 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Click or drag images</p>
        </div>
      ) : (
        <>
          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previewUrls.map((url: string, index: number) => (
              <div
                key={index}
                className="relative group w-full aspect-square rounded-lg overflow-hidden border"
              >
                <Image src={url} alt="Preview" fill className="object-cover" />

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black/60 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* ADD MORE BUTTON */}
          <div
            onClick={handleThumbnailClick}
            className="h-32 flex flex-col items-center justify-center 
            border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/20 transition"
          >
            <ImagePlus className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Add more images</p>
          </div>
        </>
      )}
    </div>
  );
}
