import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const SERVER_URL: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai`

interface searchFieldType {
    prompt: string
}

export const searchField = createAsyncThunk(
    'ai/search',
    async (data: searchFieldType, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/searchField`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

interface createPlanType {
    prompt: string,
    days: number,
    members: number | string,
    budgetType: string,
    origin: string,
    destination: string
}

export const createPlan = createAsyncThunk(
    'ai/createPlan',
    async (data: createPlanType, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/createPlan`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

interface initialStateType {
    aiLoading: boolean,
    allFields: any,
    plans: any
}

const initialState: initialStateType = {
    aiLoading: false,
    allFields: {},
    plans: null
}

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //searchField
        builder
            .addCase(searchField.pending, (state) => {
                state.aiLoading = true
            })
            .addCase(searchField.fulfilled, (state, action) => {
                state.aiLoading = false
                state.allFields = action.payload.data
            })
            .addCase(searchField.rejected, (state) => {
                state.aiLoading = false
            })
        //create plans
        builder
            .addCase(createPlan.pending, (state) => {
                state.aiLoading = true
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.aiLoading = false
                state.plans = action.payload.data.plan
            })
            .addCase(createPlan.rejected, (state) => {
                state.aiLoading = false
            })
    }
})

export default aiSlice.reducer