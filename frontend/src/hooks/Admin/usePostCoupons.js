import { useState } from 'react';
import { useVariableContext } from '../../context/VariableContext';

const usePostCoupon = (couponData) => {
    const { host, token } = useVariableContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const postCoupon = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${host}/admin/addcoupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(couponData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "An error occurred while creating the coupon.");
            }

            setSuccess(true); // If the coupon is successfully created
            return result;

        } catch (error) {
            setError(error.message || "Failed to create coupon. Please try again.");
            console.error("Error posting coupon:", error);
        } finally {
            setLoading(false);
        }
    };

    return { postCoupon, loading, error, success };
};

export default usePostCoupon;
