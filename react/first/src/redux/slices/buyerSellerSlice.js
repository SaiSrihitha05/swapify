import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Make HTTP request using redux-thunk middleware
export const buyerSellerLoginThunk = createAsyncThunk("buyer-seller-login", async (userCredObj, thunkApi) => {
  
  try {
    if (userCredObj.userType === "seller") {
      const res = await axios.post(
        "http://localhost:4000/seller-api/login",
        userCredObj
      );
      if (res.data.message == "login success") {
        //store token in local/session storage
        localStorage.setItem("token", res.data.token);

        //return data
      } else {
        return thunkApi.rejectWithValue(res.data.message);
      }
      return res.data;
    }
    if (userCredObj.userType === "buyer") {
      const res = await axios.post(
        "http://localhost:4000/buyer-api/login",
        userCredObj
      );
      if (res.data.message == "login success") {
        //store token in local/session storage
        localStorage.setItem("token", res.data.token);
      } else {
        return thunkApi.rejectWithValue(res.data.message);
      }
      return res.data;
    }
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const buyerSellerSlice = createSlice({
  name: "buyer-seller-login",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccurred: false,
    errMsg: ''
  },
  reducers: {
    resetState: (state,action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginUserStatus = false;
      state.errorOccurred = false;
      state.errMsg = '';
    }
  },
  extraReducers: (builder) => builder
    .addCase(buyerSellerLoginThunk.pending, (state,action) => {
      state.isPending = true;
    })
    .addCase(buyerSellerLoginThunk.fulfilled, (state, action) => {
      console.log(action);
      state.isPending = false;
      if (action.payload.seller) {
          state.currentUser = action.payload.seller;
      } else if (action.payload.user) {
          state.currentUser = action.payload.user;
      } else {
          state.currentUser = {};
      }
      state.loginUserStatus = true;
      state.errMsg = '';
      state.errorOccurred = false;
      // Print the action object
      console.log(state)
      console.log('Fulfilled Action:', action);
    })
    
    .addCase(buyerSellerLoginThunk.rejected, (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginUserStatus = false;
      state.errMsg = action.payload;
      state.errorOccurred = true;
    }),
});

// Export action creator functions
export const { resetState } = buyerSellerSlice.actions;

// Export root reducer of this slice
export default buyerSellerSlice.reducer;
