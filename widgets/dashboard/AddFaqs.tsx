"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

export function AddFAQs() {
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const updateFaq = (
    index: number,
    key: "question" | "answer",
    value: string
  ) => {
    const newFaqs = [...faqs];
    newFaqs[index][key] = value;
    setFaqs(newFaqs);
  };

  const addFaq = (index?: number) => {
    if (index !== undefined) {
      const newFaqs = [...faqs];
      newFaqs.splice(index + 1, 0, { question: "", answer: "" });
      setFaqs(newFaqs);
    } else {
      setFaqs([...faqs, { question: "", answer: "" }]);
    }
  };

  const removeFaq = (index: number) => {
    if (faqs.length === 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl border p-6">
      <h2 className="text-xl font-semibold mb-4">FAQs</h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-3 border-b pb-6">
            {/* Question Row */}
            <div className="flex items-center gap-3">
              <Input
                placeholder="Enter question"
                value={faq.question}
                onChange={(e) => updateFaq(index, "question", e.target.value)}
                className="flex-1"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={() => addFaq(index)}
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => removeFaq(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Answer */}
            <Textarea
              placeholder="Enter answer"
              value={faq.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        ))}
      </div>

      {/* Add Bottom */}
      <div className="pt-6 flex justify-center">
        <Button variant="ghost" onClick={() => addFaq()} className="gap-2">
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </div>
    </div>
  );
}
