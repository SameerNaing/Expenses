import React, { useState } from "react";

import * as filterConstants from "../constants/filterConstants";

interface FilterStates {
  investmentStatus: string;
  category: string;
  month: string;
  year: string | number;
}

const initState: FilterStates = {
  investmentStatus: filterConstants.ALL_STATUS,
  category: filterConstants.ALL_CATEGORIES,
  month: filterConstants.ALL_MONTHS,
  year: filterConstants.ALL_YEARS,
};

/** Hook to manage filters  */
function useDataFilterHook() {
  const [filters, setFilters] = useState<FilterStates>(initState);
  const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name: string = e.target.name;
    const value: string | number = e.target.value;
    setFilters((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return {
    investmentFilterName: "investmentStatus",
    categoryFilterName: "category",
    monthFilterName: "month",
    yearFilterName: "year",
    filters,
    changeFilter,
  };
}

export default useDataFilterHook;
