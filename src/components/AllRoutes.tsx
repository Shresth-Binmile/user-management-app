import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile"
import { userContext } from "../utils/UserContext"
import { useFetch } from "../utils/useFetch"

const AllRoutes = () => {

    const {users} = useFetch()

    return (
        <userContext.Provider value={users}>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                </Routes>
            </Router>
        </userContext.Provider>
    )
}

export default AllRoutes