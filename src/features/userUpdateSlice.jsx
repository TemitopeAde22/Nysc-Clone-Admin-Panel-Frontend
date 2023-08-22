import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        updateUserStart: (state) => {
            state.loading = true
            state.error = null
        },
        updateUserSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { updateUserStart, updateUserSuccess, updateUserFailure } =
    updateSlice.actions

export default updateSlice.reducer
