import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const SERVER_URL: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tripPlan`

export const savePlan = createAsyncThunk(
    'plan/savePlan',
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/savePlan`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            console.log(error)
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const deletePlan = createAsyncThunk(
    'plan/deletePlan',
    async (planId: string, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/deletePlan/${planId}`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            const err = error as AxiosError<any>
            return rejectWithValue(err?.response?.data || "Something went wrong")
        }
    }
)

export const getAllPlans = createAsyncThunk(
    'plan/getAllPlan',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/all-plan`,
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
    tripLoading: boolean,
    tripAllPlans: any,
    allPlanFetched: boolean
}

const initialState: initialStateType = {
    tripLoading: false,
    tripAllPlans: [],
    allPlanFetched: false
}

const tripPlanSlice = createSlice({
    name: 'tripPlan',
    initialState,
    reducers: {
        optimizeDeleteTrip: (state, action) => {
            const { planId } = action.payload
            if (!planId) {
                return
            }
            state.tripAllPlans = state.tripAllPlans.filter((trip: any) => trip._id !== planId)
        }
    },
    extraReducers: (builder) => {
        //savePlan
        builder
            .addCase(savePlan.pending, (state) => {
                state.tripLoading = true
            })
            .addCase(savePlan.fulfilled, (state, action) => {
                state.tripLoading = false
                state.tripAllPlans.push(action.payload.data)
            })
            .addCase(savePlan.rejected, (state) => {
                state.tripLoading = false
            })
        //deletePlan
        builder
            .addCase(deletePlan.pending, (state) => {
                state.tripLoading = true
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.tripLoading = false
                const tripId = action.payload.data
                state.tripAllPlans = state.tripAllPlans.filter((trip: any) => trip._id !== tripId)
            })
            .addCase(deletePlan.rejected, (state) => {
                state.tripLoading = false
            })
        //get all plans
        builder
            .addCase(getAllPlans.pending, (state) => {
                state.tripLoading = true
            })
            .addCase(getAllPlans.fulfilled, (state, action) => {
                state.tripLoading = false
                state.allPlanFetched = true
                state.tripAllPlans = action.payload.data
            })
            .addCase(getAllPlans.rejected, (state) => {
                state.tripLoading = false
                state.allPlanFetched = true
            })
    }
})

export const { optimizeDeleteTrip } = tripPlanSlice.actions
export default tripPlanSlice.reducer