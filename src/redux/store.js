import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { jobsApi } from "@/redux/features/api/job/jobsApi";

const store = configureStore({
  reducer: {
    // Define your reducers here
    auth: authSlice,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(jobsApi.middleware),
});
setupListeners(store.dispatch);
export default store;
