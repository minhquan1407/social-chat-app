import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/forgotWassword/ForgotPassword";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ResetPassword from "../pages/resetPassword/ResetPassword";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/forgotPassword">
                    <ForgotPassword />
                </Route>
                {/* <Route path="/reset/:accessToken">
                    <ResetPassword />
                </Route> */}
            </Routes>
        </>
    )
}
export default AppRoutes;