import React, { useState, useEffect } from 'react';
import './shippingAddress.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function ShippingAddress() {
    const [address, setAddress] = useState({});
    const [newAddress, setNewAddress] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  // For displaying validation message

    useEffect(() => {
        const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
        if (savedAddress) {
            setAddress(savedAddress);
        }
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
        setErrorMessage(''); // Clear error when user types
    };

    const addOrUpdateAddress = () => {
        // Validation for required fields
        if (!newAddress.name || !newAddress.mobileNumber || !newAddress.addressLine1 || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
            setErrorMessage('Please fill in all required fields.');
            return; // Stop the function if validation fails
        }

        // Save new address to state and localStorage
        setAddress(newAddress);
        localStorage.setItem('shippingAddress', JSON.stringify(newAddress));
        resetForm();
        setShowForm(false);
    };

    const deleteAddress = () => {
        setAddress({});
        localStorage.removeItem('shippingAddress');
    };

    const resetForm = () => {
        setNewAddress({
            name: '',
            mobileNumber: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
        });
        setErrorMessage(''); // Clear error message when resetting the form
    };

    return (
        <div className="shipping-address-container">
            <h2>Shipping Address</h2>

            {!address.name ? (
                <button onClick={() => setShowForm(true)}>Add Shipping Address</button>
            ) : (
                <div className="saved-address">
                    <div className='address-box'>
                        <p>{`${address.name}, ${address.mobileNumber}, ${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}`}</p>
                    </div>
                    <div className='address-operations'>
                        <button onClick={deleteAddress} className="icon-button delete">
                            <FaTrash />
                        </button>
                        <button onClick={() => setShowForm(true)} className="icon-button update">
                            <FaEdit />
                        </button>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="popup-form">
                    <div className="popup-content">
                        <h2>{!address.name ? 'Add' : 'Update'} Address</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={newAddress.name || ''}
                            onChange={handleAddressChange}
                            required
                        />
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={newAddress.mobileNumber || ''}
                            onChange={handleAddressChange}
                            required
                        />
                        <input
                            type="text"
                            name="addressLine1"
                            placeholder="Address Line 1"
                            value={newAddress.addressLine1 || ''}
                            onChange={handleAddressChange}
                            required
                        />
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2"
                            value={newAddress.addressLine2 || ''}
                            onChange={handleAddressChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={newAddress.city || ''}
                            onChange={handleAddressChange}
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={newAddress.state || ''}
                            onChange={handleAddressChange}
                            required
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={newAddress.postalCode || ''}
                            onChange={handleAddressChange}
                            required
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button onClick={addOrUpdateAddress}>
                            {!address.name ? 'Add' : 'Update'} Address
                        </button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
