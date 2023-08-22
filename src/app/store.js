import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "../features/authSlice"
import userReducer from "../features/userSlice"
import allUsersReducer from "../features/allUserSlice"
import user2Reducer from "../features/userSlice2"
import updateReducer from "../features/userUpdateSlice"
import forgotPasswordReducer from "../features/forgotPasswordSlice"

const persistConfig = { key: "root", storage, whitelist: ["auth"] }
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    user2: user2Reducer,
    allusers: allUsersReducer,
    update: updateReducer,
    forgotPassword: forgotPasswordReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer })
export const persistor = persistStore(store)
