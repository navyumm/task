import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    status: false,
    userData: null,
};

export const createAccount = createAsyncThunk("register", async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);

    try {
        const response = await axiosInstance.post("/user/register", formData);
        toast.success("Registered successfully!!!");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axiosInstance.post("/user/login", data);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        toast.success("Logged In Successfully !!");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.post("/user/logout");
        toast.success("Logged Out Successfully !!");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const refreshAccessToken = createAsyncThunk("refreshAccessToken", async (data) => {
        try {
            const response = await axiosInstance.post("/user/refresh-token", data);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const changePassword = createAsyncThunk("changePassword", async (data) => {
        try {
            const response = await axiosInstance.post("/user/change-password", data);
            toast.success("Password changed Successfully!!!");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const currentUser = createAsyncThunk("current-user", async(data) => {
    await axiosInstance.get("/user/current")
} )

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
    },
});

export default authSlice.reducer;