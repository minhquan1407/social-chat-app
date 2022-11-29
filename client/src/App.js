import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/forgotWassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/forgotPassword">
          {user ? <Redirect to="/" /> : <ForgotPassword />}
        </Route>
        <Route path="/user/reset/:accessToken">
          {user ? <Redirect to="/" /> : <ResetPassword />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        {/* <Route path="/forgotPassword">
          <ForgotPassword />
        </Route> */}
      </Switch>
    </Router>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}

export default App;
