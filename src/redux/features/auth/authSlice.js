import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  isLogin: false,
  userDetails: {},
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, username, role }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        userDetails: JSON.stringify(user),
        role: role,
      });

      const userData = { ...user, role: role }; // Include role in currentUser object
      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
    } catch (error) {
      // Handle sign-up error
      throw error;
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      const role = userDoc.data()?.role || "";

      // Store the role in localStorage

      const userData = { ...user, role: role };
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error) {
      // Handle sign-in error
      throw error;
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("userData");
  } catch (error) {
    // Handle sign-out error
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = action.payload ? true : false;
      state.userDetails = action.payload;
    },
    clearUser: (state) => {
      state.isLogin = false;
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isLogin = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.userDetails = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.isLogin = false;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.isLogin = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.userDetails = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        state.userDetails = null;
        state.isError = false;
        state.error = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
