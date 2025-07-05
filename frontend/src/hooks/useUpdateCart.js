import { useEffect, useState } from 'react';
import { useVariableContext } from '../context/VariableContext';

const useUpdateCart = () => {
    const { host,token, setCartItems } = useVariableContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const updateCartItems = async (cartItems) => {
        setLoading(true);
        setError(null);
        // console.log("updating cartitems");
        
        try {
            const response = await fetch(`${host}/cart/updatecart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ cartItems }),
            });

            const data = await response.json();
            // console.log(data);

            if (!response.ok) {
                setError(data.message || 'Failed to update cart');
                return;
            }

            setSuccessMsg(data.message || 'Cart updated successfully');
            setCartItems(data.updatedCartItems);

        } catch (error) {
            setError('An error occurred while updating the cart. Please try again later.');
            console.error('Error updating cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (successMsg) {
            console.log(successMsg);
        }
    }, [successMsg]);

    return { updateCartItems, successMsg, loading, error };
};

export default useUpdateCart;