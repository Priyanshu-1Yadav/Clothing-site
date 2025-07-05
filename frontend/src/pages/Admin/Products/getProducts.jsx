import React, { useState } from 'react';
import useGetAllProducts from '../../../hooks/useGetAllProducts';
import EditProducts from './editProducts';
import './getProducts.css';

export default function GetProducts() {
    const { products, loading, error } = useGetAllProducts();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    console.log(products);
    

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsPopupOpen(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div className="products-container">
            <h2>Product List</h2>
            {/* <button className="add-button" onClick={handleAddClick}>
                Add Product
            </button> */}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {/* <th>Type</th> */}
                        <th>Price</th>
                        <th>Description</th>
                        {/* <th>Rating</th> */}
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && (
                        <tr>
                            <td colSpan="9">No products available</td>
                        </tr>
                    )}
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td data-label="Product ID">{product.id}</td>
                            <td data-label="Name">{product.name}</td>
                            {/* <td data-label="Type">{product.type}</td> */}
                            <td data-label="Price">{product.price}</td>
                            <td data-label="Description">{product.description}</td>
                            {/* <td data-label="Rating">{product.rating}</td> */}
                            <td data-label="Stock">{product.inStock}</td>
                            <td data-label="Category">{product.category}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditClick(product)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isPopupOpen && (
                <EditProducts
                    product={selectedProduct}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
}
