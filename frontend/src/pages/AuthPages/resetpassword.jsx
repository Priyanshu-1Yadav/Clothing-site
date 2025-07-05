import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./auth.css";
import { useVariableContext } from "../../context/VariableContext";

const ResetPassword = () => {


    const { host } = useVariableContext();
    const { userId, token } = useParams();
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async () => {

        const response = await fetch(`${host}/password/resetpassword/${userId}/${token}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: newPassword
            })
        })

        const data = await response.json();
        console.log(data);

        if (data && data.message) {
            setError(data.message)

            if (data.message === "Password reset successful.") {
                // Set a delay of 3 seconds before redirecting
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // 3000 ms = 3 seconds
            }
        }

    }

    return (
        <div className="parent-container">
            <div className="auth-container">
                <h1>Reset Password</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">Enter New Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="New password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                    </div>

                    { error === "Password reset successful." ? <p className="error-message">Password reset successful, redirecting you to the login page</p> : <p className="error-message">{error}</p>}

                    <button onClick={() => handleSubmit()} type="submit" className="submit-button">Change Password</button>
                </form>
                <p className="auth-footer">
                    Remembered your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;