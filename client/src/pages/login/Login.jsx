import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
   try {
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
   } catch (error) {
    toast.error(error.response.data.msg);
   }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social NetWork</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                  </Stack>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot" >
            <Link to="/forgotPassword" style={{"textDecoration": "none", "cursor": "pointer"}}>Forgot your password?</Link>
            </span>
            <button className="loginRegisterButton">
              {isFetching ? (
                  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                  </Stack>
              ) : (
                <Link to="/register" style={{"textDecoration": "none"}}>Create a New Account</Link>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
