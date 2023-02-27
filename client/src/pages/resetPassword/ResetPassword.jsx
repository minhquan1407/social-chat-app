import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isLength, isMatch } from "../../utils/Validation";
import "./reset.css";

const initialState = {
  password: "",
  cf_password: "",
};

export default function ResetPassword() {
    const [data, setData] = useState(initialState);
    const [isSuccess, setIsSuccess] = useState(false);

  const { accessToken } = useParams();
  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Password did not match.",
        success: "",
      });
    try {
      const res = await axios.post('/auth/reset', {password}, {
        headers: {Authorization: accessToken}
    })
      console.log(accessToken)
      console.log("check res", res);
      toast.success("ResetPassword Success!");
      //   return setData({ ...data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="form_reset">
      <h2 className="loginLogo">Reset Your Password</h2>

      <div className="row form_input">
        <div className="input_top">
          <label htmlFor="password" className="loginDesc">
            Password:{" "}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New Password!"
            className="loginInput"
            value={password}
            onChange={handleChangeInput}
          />
        </div>

        <div className="input_bot">
          <label className="loginDesc" htmlFor="cf_password">
            Confirm Password:{" "}
          </label>
          <input
            type="password"
            name="cf_password"
            placeholder="Enter new password!"
            id="cf_password"
            className="loginInput"
            s
            value={cf_password}
            onChange={handleChangeInput}
          />
        </div>

        <button className="loginRegisterButtonn" onClick={handleResetPass}>
          {isSuccess ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              ResetPassword
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
