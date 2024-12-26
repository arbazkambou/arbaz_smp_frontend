"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "./ui/checkbox";

const categoryOptions = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "sports", label: "Sports" },
  { value: "home", label: "Home" },
];

const ageOptions = [
  { value: "all", label: "All" },
  { value: "0-3", label: "0-3 years old" },
  { value: "4-7", label: "4-7 years old" },
  { value: "8-12", label: "8-12 years old" },
  { value: "13-17", label: "13-17 years old" },
];

export function FilterProduct() {
  const [category, setCategory] = useState("all");
  const [age, setAge] = useState("all");

  const handleCategoryChange = (value) => {
    setCategory(value);
    // Here you would typically trigger a filter update in your main component or state management system
  };

  const handleAgeChange = (value) => {
    setAge(value);
    // Here you would typically trigger a filter update in your main component or state management system
  };

  return (
    <aside className="w-64 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters Products</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">By Category</h3>
        <RadioGroup value={category} onValueChange={handleCategoryChange}>
          {categoryOptions.map((option) => (
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="text-sm font-medium mb-2">Age Range</h3>
        <RadioGroup value={age} onValueChange={handleAgeChange}>
          {ageOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`age-${option.value}`} />
              <Label htmlFor={`age-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </aside>
  );
}
