import React, { useState } from 'react';
import { useVariableContext } from '../../../context/VariableContext';
import './editProducts.css';

export default function EditProducts({ product, onClose }) {

    const {host, token} = useVariableContext();

    const [formData, setFormData] = useState({
        name: product?.name || '',
        // type: product?.type || '',
        price: product?.price || '',
        description: product?.description || '',
        inStock: product?.inStock || false, // Changed from stock (number) to inStock (boolean)
        category: product?.category || '',
    });

    const [message, setMessage] = useState({ text: '', type: '' }); // Tracks success/error messages

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/admin/editproduct/${product.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage({ text: 'Product saved successfully!', type: 'success' });
                setTimeout(() => onClose(), 1500); // Close popup after success message
            } else {
                setMessage({ text: 'Error saving product. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('API call failed:', error);
            setMessage({ text: 'Error saving product. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {/* <label>
                        Type:
                        <input
                            type="text"
                            name="type"
                            placeholder="Type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </label> */}
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        In Stock:
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {message.text && (
                        <p className={`message ${message.type}`}>
                            {message.text}
                        </p>
                    )}
                    <button type="submit" className="submit-button">
                        {product ? 'Save Changes' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}
