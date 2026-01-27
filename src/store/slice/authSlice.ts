import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const SERVER_URL: string = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const registration = createAsyncThunk(
    'auth/registration',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/register`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const verifyRegi = createAsyncThunk(
    'auth/verify-regi',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/verify-regi`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/login`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async(_, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/logout`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const forgetPass = createAsyncThunk(
    'auth/forgetPass',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/forget-pass`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const verifyPass = createAsyncThunk(
    'auth/verifyPass',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/verify-pass`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const resetPass = createAsyncThunk(
    'auth/resetPass',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${SERVER_URL}/reset-pass`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const resendOTP = createAsyncThunk(
    'auth/resendOtp',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/resend-otp`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

type authState = {
    authLoading: Boolean
}

const initialState:authState = {
    authLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        //registration
        builder
            .addCase(registration.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(registration.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(registration.rejected, (state)=>{
                state.authLoading = false
            })
        //verify
        builder
            .addCase(verifyRegi.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(verifyRegi.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(verifyRegi.rejected, (state)=>{
                state.authLoading = false
            })
        //login
        builder
            .addCase(login.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(login.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(login.rejected, (state)=>{
                state.authLoading = false
            })
        //logout
        builder
            .addCase(logout.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(logout.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(logout.rejected, (state)=>{
                state.authLoading = false
            })
        //forgetPass
        builder
            .addCase(forgetPass.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(forgetPass.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(forgetPass.rejected, (state)=>{
                state.authLoading = false
            })
        //verifyPass
        builder
            .addCase(verifyPass.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(verifyPass.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(verifyPass.rejected, (state)=>{
                state.authLoading = false
            })
        //resetPass
        builder
            .addCase(resetPass.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(resetPass.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(resetPass.rejected, (state)=>{
                state.authLoading = false
            })
        //resendOtp
        builder
            .addCase(resendOTP.pending, (state)=>{
                state.authLoading = true
            })
            .addCase(resendOTP.fulfilled, (state)=>{
                state.authLoading = false
            })
            .addCase(resendOTP.rejected, (state)=>{
                state.authLoading = false
            })
    }
})

export default authSlice.reducer