"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModelStore } from "@/store/model";

const MODELS = ["gpt-3.5-turbo", "gpt-4", "gpt-4o"];

export function ModelSelect() {
  const currentModel = useModelStore((state) => state.model);
  const updateModel = useModelStore((state) => state.updateModel);

  const handleChange = (selectModel: string) => {
    updateModel(selectModel);
  };
  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] border-none text-xl focus:ring-transparent">
        <SelectValue placeholder="모델 선택" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem key={model} value={model} disabled={currentModel === model}>
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}