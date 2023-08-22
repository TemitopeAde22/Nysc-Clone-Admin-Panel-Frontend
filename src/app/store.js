import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import userReducer from "../features/userSlice"
import allUsersReducer from "../features/allUserSlice"
import user2Reducer from "../features/userSlice2"
import updateReducer from "../features/userUpdateSlice"
import forgotPasswordReducer from "../features/forgotPasswordSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        user2: user2Reducer,
        allusers: allUsersReducer,
        update: updateReducer,
        forgotPassword: forgotPasswordReducer,
    },
})
