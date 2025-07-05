import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVariableContext } from "../../context/VariableContext";

export const useRegister = () => {
    const { host } = useVariableContext();
    const [registerError, setRegisterError] = useState(null);
    const navigate = useNavigate();

    const register = async (name, email, mobile, password) => {
        try {
            const response = await fetch(`${host}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, mobile, email, password }),
            });
            const data = await response.json();
            // console.log(data);
            
            if (!response.ok) {
                setRegisterError(data.message);
                return;
            }
            setRegisterError(null);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/login");
        } catch (error) {
            setRegisterError(error.message);
            console.log(error);
        }
    };

    return { register, registerError };
};
