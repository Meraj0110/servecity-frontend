"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export function ProcessSteps() {
  const [steps, setSteps] = useState([
    { step: "", details: "", image: null as File | null, preview: "" },
  ]);

  // Handle drag reorder
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setSteps(items);
  };

  const updateStep = (index: number, key: string, value: any) => {
    const newSteps = [...steps];
    newSteps[index][key] = value;
    setSteps(newSteps);
  };


  const addStep = (index?: number) => {
    const newStep = { step: "", details: "", image: null, preview: "" };

    if (index !== undefined) {
      const newSteps = [...steps];
      newSteps.splice(index + 1, 0, newStep);
      setSteps(newSteps);
    } else {
      setSteps([...steps, newStep]);
    }
  };

  const removeStep = (index: number) => {
    if (steps.length === 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleImageUpload = (index: number, file: File) => {
    const newPreview = URL.createObjectURL(file);
    const newSteps = [...steps];
    newSteps[index].image = file;
    newSteps[index].preview = newPreview;
    setSteps(newSteps);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl border p-6">
      <h2 className="text-xl font-semibold mb-4">Process</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="process-steps">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {steps.map((item, index) => (
                <Draggable
                  key={index.toString()}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(providedDrag) => (
                    <div
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      {/* Drag Handle */}
                      <div
                        {...providedDrag.dragHandleProps}
                        className="cursor-grab mb-3 text-gray-400 hover:text-black"
                      >
                        ⋮⋮ drag
                      </div>

                      <div className="space-y-3">
                        {/* Step */}
                        <Input
                          placeholder="Step title"
                          value={item.step}
                          onChange={(e) =>
                            updateStep(index, "step", e.target.value)
                          }
                        />

                        {/* Details */}
                        <Textarea
                          placeholder="Step details"
                          value={item.details}
                          onChange={(e) =>
                            updateStep(index, "details", e.target.value)
                          }
                          className="min-h-[80px]"
                        />

                        {/* Image Upload */}
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(index, e.target.files[0]);
                              }
                            }}
                          />

                          {item.preview && (
                            <img
                              src={item.preview}
                              alt="Preview"
                              className="h-32 w-32 object-cover rounded-md border"
                            />
                          )}
                        </div>

                        {/* Add / Remove */}
                        <div className="flex gap-3 pt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addStep(index)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeStep(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add at Bottom */}
      <div className="pt-6 flex justify-center">
        <Button variant="ghost" className="gap-2" onClick={() => addStep()}>
          <Plus className="h-4 w-4" /> Add Step
        </Button>
      </div>
    </div>
  );
}
