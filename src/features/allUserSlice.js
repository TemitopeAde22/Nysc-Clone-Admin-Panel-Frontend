import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allUsers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.allUsers = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = "User data loaded successfully."
        },
        setUsersLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setUsersError: (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        },
    },
})

export const { setUsers, setUsersLoading, setUsersError } =
    allUsersSlice.actions

export default allUsersSlice.reducer
