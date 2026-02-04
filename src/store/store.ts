import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'
import aiReducer from './slice/aiSlice'
import tripPlanReducer from './slice/tripPlanSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        ai: aiReducer,
        tripPlan: tripPlanReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store