import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const getUrlForUpload = createAsyncThunk(
  "upload/getUrlUpload",
  async (params, { dispatch }) => {
    try {
      const response = await axios.get(params.url, {
        headers: {
          Authorization:
            "OAuth y0_AgAAAABlXjFoAApCSgAAAADo9Ju6Ua4cuQKdSaWGFDNbwVXb5TuukIM",
          "Content-Type": "application/octet-stream",
        },
      });

      dispatch(addFileToYandex({ data: response.data, file: params.file }));
    } catch (error) {
      return error;
    }
  }
);

const addFileToYandex = createAsyncThunk(
  "upload/addFileToYandex",
  async (params) => {
    try {
      const response = await axios.put(params.data.href, params.file, {
        headers: {
          "Content-Type": params.file.type,
        },
      });

      alert("Успешно загружено");
      return response;
    } catch (error) {
      alert(error.message);

      return error;
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    data: {},
  },
});

export { uploadSlice, getUrlForUpload, addFileToYandex };
