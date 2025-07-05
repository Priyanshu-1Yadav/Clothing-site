import { useState, useEffect } from "react";
import { useVariableContext } from "../../context/VariableContext";

const useGetOrders = () => {

    const { host, token } = useVariableContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${host}/admin/getorders`, {
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

                setOrders(data.orders);
                console.log(data.orders);
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [host, token]);

    return { orders, loading, error };
}

export default useGetOrders;