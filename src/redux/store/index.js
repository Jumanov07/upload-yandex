import { configureStore } from "@reduxjs/toolkit";
import { uploadSlice } from "../slices/uploadSlice";

export default configureStore({
  reducer: {
    upload: uploadSlice.reducer,
  },
});
