import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.user = action.payload
            state.isLoggedIn = true // Set isLoggedIn to true after successful login
        },
        logout: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.user = null
            state.isLoggedIn = false // Set isLoggedIn to false after logout
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(registerUser.pending, (state) => {
    //             state.isLoading = true
    //             state.isError = false
    //             state.isSuccess = false
    //             state.message = ""
    //         })
    //         .addCase(registerUser.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isError = false
    //             state.isSuccess = true
    //             state.user = action.payload // Update the user state with the result
    //         })
    //         .addCase(registerUser.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.isSuccess = false
    //             state.message = action.error.message || "An error occurred"
    //         })
    // },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
