import "./App.css"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import ForgotPassword from "./pages/Forgot-password/ForgotPassword"
import ResetPassword from "./pages/Reset-password/ResetPassword"
import MainLayout from "./components/MainLayout"
import DashBoard from "./pages/Dashboard/DashBoard"
import User from "./pages/user/User"
import PPAPosting from "./pages/PPA Posting/PPAPosting"
import ProtectedRoute from "./components/HOC"
import NameCorrection from "./pages/Correction/NameCorrection"
import CourseCorrection from "./pages/Correction/courseCorrection"
import Calender from "./pages/Calender/Calender"
import Profile from "./pages/Profile/userProfile"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route
                        path="general-correction"
                        element={<ProtectedRoute component={NameCorrection} />}
                    />
                    <Route
                        index
                        element={<ProtectedRoute component={DashBoard} />}
                    />
                    <Route
                        path="user"
                        element={<ProtectedRoute component={User} />}
                    />
                    <Route
                        path="ppa-posting"
                        element={<ProtectedRoute component={PPAPosting} />}
                    />
                    <Route
                        path="course-correction"
                        element={
                            <ProtectedRoute component={CourseCorrection} />
                        }
                    />
                    <Route
                        path="calender"
                        element={<ProtectedRoute component={Calender} />}
                    />
                    <Route
                        path="userprofile/:id"
                        element={<ProtectedRoute component={Profile} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
