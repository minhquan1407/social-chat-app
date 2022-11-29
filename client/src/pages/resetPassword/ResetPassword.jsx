import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isLength, isMatch } from "../../utils/Validation";

const initialState = {
  password: "",
  cf_password: "",
};

export default function ResetPassword() {
    const [data, setData] = useState(initialState);
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
    <div className="fg_pass">
      <h2>Reset Your Password</h2>

      <div className="row">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />

        <label htmlFor="cf_password">Confirm Password</label>
        <input
          type="password"
          name="cf_password"
          id="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
        />

        <button onClick={handleResetPass}>Reset Password</button>
      </div>
    </div>
  );
}
