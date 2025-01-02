"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "./ui/checkbox";
import { useFilter } from "@/providers/FilterProvider";

const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "sports", label: "Sports" },
  { value: "home", label: "Home" },
];

const ageOptions = [
  { value: "0-2", label: "0-2 years old" },
  { value: "3-5", label: "3-5 years old" },
  { value: "6-8", label: "6-8 years old" },
  { value: "9-11", label: "9-11 years old" },
];

export function FilterProduct() {
  const { ageFilter, setAgeFilter, categoryFilter, setCategoryFilter } =
    useFilter();
  const handleCategoryChange = (value) => {
    setCategoryFilter((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleAgeChange = (value) => {
    setAgeFilter((prev) =>
      prev.includes(value)
        ? prev.filter((age) => age !== value)
        : [...prev, value]
    );
  };

  return (
    <aside className="w-64 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters Products</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">By Category</h3>
        <div className="flex flex-col gap-3">
          {categoryOptions.map((option, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <Checkbox
                id="terms"
                checked={categoryFilter.includes(option.value)}
                onCheckedChange={() => handleCategoryChange(option.value)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="text-sm font-medium mb-2">Age Range</h3>
        <div className="flex flex-col gap-3">
          {ageOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`age-${option.value}`}
                checked={ageFilter.includes(option.value)}
                onCheckedChange={() => handleAgeChange(option.value)}
              />
              <Label htmlFor={`age-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
