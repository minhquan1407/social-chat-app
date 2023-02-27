import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./auth.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleForgotPassword = async () => {
        try {
            await axios.post("/auth/forgot", {email});
            toast.success("Forgot Password Success")
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
  return (
    <>
      <div className="login_page">
        <h2 className="loginLogo">Forgot Your Password!</h2>
        <div>
          <label className="loginDesc"> Your Email address: </label>
          <input
            value={email}
            type="email"
            placeholder="Email Forgot Your Password!"
            className="loginInputR"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="loginButtonn" onClick={() => handleForgotPassword()}>
          {isSuccess ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
             ForgotPassword
            </Link>
          )}
        </button>
      </div>
    </>
  );
}
