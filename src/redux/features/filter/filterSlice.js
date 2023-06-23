const { createSlice } = require("@reduxjs/toolkit");

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    searchJob: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default filterSlice.reducer;

export const { searchJob } = filterSlice.actions;
