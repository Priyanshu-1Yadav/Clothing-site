import { useState, useEffect } from "react";
import { useVariableContext } from "../../context/VariableContext";

const useGetCoupons = () => {

    const { host, token } = useVariableContext();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${host}/admin/getcoupons`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                setCoupons(data.coupons);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCoupons();
    }, [host, token]);

    return { coupons, loading, error };
}

export default useGetCoupons;