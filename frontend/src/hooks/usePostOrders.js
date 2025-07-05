import { useState } from 'react';
import { useVariableContext } from '../context/VariableContext';
import ShippingAddress from '../pages/Cart/shippingAddresses';

export const usePostOrders = () => {
    const { host,token} = useVariableContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const [shippingAddress, setShippingAddress] = useState(() => {
        const storedUser = localStorage.getItem('shippingAddress');
        return storedUser ? JSON.parse(storedUser) : null; // Parse the stored user JSON string
      });
      
        const createNewOrder = async (cartItems, subtotal, totalPrice, shippingCost, couponDiscount) => {
        setLoading(true);
        setError(null);  // Reset error before making a new request
        // console.log('Creating new order...');
        // console.log("Order Items", cartItems);

        const orderData = { 
            orderedItems : cartItems,
            subtotal,
            discountCode: "DISCOUNT10",
            discountedAmount: couponDiscount,
            totalPrice,
            shippingAddress,
            paymentMethod : 'PREPAID',
            paymentStatus : 'PENDING',
            orderStatus : 'CREATED',

        };

        try {
            const response = await fetch(`${host}/order/createorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),  // Send the order data
            });

            const data = await response.json();
            console.log('Response Data:', data);

            if (!response.ok) {
                // If the response is not OK, set the error with the message from the API
                setError(data.message || 'An error occurred while placing the order.');
                return;
            }

            setSuccessMsg(data.message || 'Order created successfully.');
        } catch (error) {
            // If the fetch request fails, set the error with the error message
            setError(error.message || 'Network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return { createNewOrder, successMsg, loading, error };
};
