// usePostProduct.js
import { useState } from 'react';
import { useVariableContext } from '../../context/VariableContext';

export default function usePostProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { host, token } = useVariableContext();

    const postProduct = async (product) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        try {
            const formData = new FormData();
            Object.keys(product).forEach(key => {
                if (key === 'images') {
                    product.images.forEach(image => formData.append('images', image));
                } else if (Array.isArray(product[key])) {
                    product[key].forEach(item => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, product[key]);
                }
            });
    
            const response = await fetch(`${host}/admin/addproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit product');
            }
    
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    return { postProduct, loading, error, success };
}
