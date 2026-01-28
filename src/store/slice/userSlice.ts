import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { login, logout } from "./authSlice"


const SERVER_URL: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/user`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

type userState = {
    userLoading: Boolean,
    user: Object
}

const initialState: userState = {
    userLoading: false,
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.data
            })
        //logout
        builder
            .addCase(logout.fulfilled, (state) => {
                state.user = {}
            })
        //getuser
        builder
            .addCase(getUser.pending, (state)=>{
                state.userLoading = true
            })
            .addCase(getUser.fulfilled, (state, action)=>{
                state.userLoading = false
                state.user = action.payload.data
            })
            .addCase(getUser.rejected, (state)=>{
                state.userLoading = false
            })
    }
})

export default userSlice.reducer