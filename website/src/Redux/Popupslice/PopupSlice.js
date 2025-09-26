import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Popup
export const createPopup = createAsyncThunk(
  "popup/submitPopup",
  async (popupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/popup/users/createPopup",
        popupData,
        { headers: { "Content-Type": "multipart/form-data" } } 
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Create failed");
    }
  }
);


// Get Popup By Id
export const getPopupById = createAsyncThunk(
  "popup/getPopupById",
  async (popupId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/popup/admin/getPopupById",
        { params: { id: popupId } } // query param
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);



// Get Popup with Filter + Pagination + Search
export const getPopups = createAsyncThunk(
  "popup/getPopups",
  async ({ page = 1, limit = 10, search = "", city, country }, { rejectWithValue }) => {
    try {
      const params = { page, limit, search, city, country };
      const response = await axios.get("http://localhost:8080/api/getPopupByFilter", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);


export const updatePopup = createAsyncThunk(
  "popup/updatePopup",
  async ({ id, popupData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/popup/admin/updatePopup",
        popupData, // goes into req.body
        { params: { id }, headers: { "Content-Type": "multipart/form-data" } } // id in query
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);




export const deletePopup = createAsyncThunk(
  "popup/deletePopup",
  async (popupId, { rejectWithValue }) => {
    try {
      await axios.delete(
        "http://localhost:8080/popup/admin/deletePopup",
        { params: { id: popupId } } 
      );
      return popupId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);



const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popups: [],
    popup: null,
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createPopup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPopup.fulfilled, (state, action) => {
        state.loading = false;
        state.popups.push(action.payload);
      })
      .addCase(createPopup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getPopupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopupById.fulfilled, (state, action) => {
        state.loading = false;
        state.popup = action.payload;
      })
      .addCase(getPopupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET WITH FILTER + PAGINATION
      .addCase(getPopups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopups.fulfilled, (state, action) => {
        state.loading = false;
        state.popups = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getPopups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updatePopup.fulfilled, (state, action) => {
        state.loading = false;
        state.popups = state.popups.map((popup) =>
          popup._id === action.payload._id ? action.payload : popup
        );
      })

      // DELETE
      .addCase(deletePopup.fulfilled, (state, action) => {
        state.loading = false;
        state.popups = state.popups.filter((popup) => popup._id !== action.payload);
      });
  },
});

export default popupSlice.reducer;
