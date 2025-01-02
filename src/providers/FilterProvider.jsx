"use client";

import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

function FilterProvider({ children }) {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [ageFilter, setAgeFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <FilterContext.Provider
      value={{
        ageFilter,
        setAgeFilter,
        categoryFilter,
        setCategoryFilter,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;

export function useFilter() {
  return useContext(FilterContext);
}
