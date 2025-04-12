import { createSlice } from "@reduxjs/toolkit";

type TinitialState = {
  category: string;
  search: string;
  priceRange: string;
  availability: string;
};

const initialState: TinitialState = {
  category: "",
  search: "",
  priceRange: "",
  availability: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => ({ ...state, category: action.payload }),
    setSearch: (state, action) => ({ ...state, search: action.payload }),
    setPriceRange: (state, action) => ({
      ...state,
      priceRange: action.payload,
    }),
    setAvailability: (state, action) => ({
      ...state,
      availability: action.payload,
    }),
    resetFilters: (state) => {
      state.category = "";
      state.search = "";
      state.priceRange = "";
      state.availability = "";
    },
  },
});

export const {
  setCategory,
  setSearch,
  setPriceRange,
  setAvailability,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
