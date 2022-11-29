import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
// import ".";

export default function ForgotPassword() {
    const [email, setEmail] = useState("")

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
      <h2>Forgot Your Password!</h2>
      <div>
        <label className="form-label"> Your Email address</label>
        <input
          value={email}
          type="email"
          placeholder="Email Forgot Your Password!"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login_page__row">
        <button onClick={() => handleForgotPassword()}>
          ForgotPassword
        </button>
      </div>
    </div>
  </>
  )
}
