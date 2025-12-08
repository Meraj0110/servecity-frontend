// src/hooks/useServiceForm.ts
"use client";

import { useState } from "react";

export function useServiceForm() {
  const [service, setService] = useState({
    serviceName: "",
    serviceDescription: "",
    tags: [],
    totalHours: "",
    totalMinutes: "",
    categoryId: "",
    subCategoryId: "",
    price: "",
    process: [], // steps
    weNeed: [], // requirements
    faqs: [], // {question, answer}
    videos: [], // file uploads
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setService((prev) => ({ ...prev, [id]: value }));
  };

  const setField = (key: string, value: any) => {
    setService((prev) => ({ ...prev, [key]: value }));
  };

  const getFormData = () => {
    const fd = new FormData();
    Object.entries(service).forEach(([key, val]) => {
      if (Array.isArray(val)) fd.append(key, JSON.stringify(val));
      else fd.append(key, val as any);
    });

    service.videos.forEach((file: File) => {
      fd.append("videos", file);
    });

    return fd;
  };

  return {
    service,
    handleChange,
    setField,
    getFormData,
  };
}
