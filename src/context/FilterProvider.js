import React, { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "../reducers";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    showModal: false,
    sortByPriority: null,
    sortByDateCreated: null,
    sortByTag: [],
  });
  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
