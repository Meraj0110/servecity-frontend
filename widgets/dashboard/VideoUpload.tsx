"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function VideoUpload() {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleVideoChange = (file: File) => {
    if (!file.type.startsWith("video/")) {
      alert("Only video files are allowed.");
      return;
    }

    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {
    setVideo(null);
    setPreview("");
  };

  return (
    <div className="max-w-md mx-auto rounded-xl border p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Upload Video</h2>

      {/* Upload field */}
      <Input
        type="file"
        accept="video/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleVideoChange(e.target.files[0]);
          }
        }}
      />

      {/* Preview */}
      {preview && (
        <div className="space-y-2">
          <video
            src={preview}
            controls
            className="w-full rounded-lg border max-h-64 object-cover"
          />

          <Button variant="outline" size="icon" onClick={removeVideo}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
