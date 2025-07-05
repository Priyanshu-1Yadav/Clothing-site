import React, { useState } from 'react';
import './addProducts.css';
import usePostProduct from '../../../hooks/Admin/usePostProducts.js';

export default function AddProducts() {
    const initialProductState = {
        name: '',
        price: '',
        description: '',
        category: '',
        featured: '',
        size: [],
        color: [],
        images: []
    };
    
    const [product, setProduct] = useState(initialProductState);
    const { postProduct, loading, error, success } = usePostProduct();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            category: e.target.value,
        }));
    };

    const handleFeaturedChange = (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            featured: e.target.value,
        }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setProduct((prevProduct) => {
            const updatedArray = checked
                ? [...prevProduct[type], value]
                : prevProduct[type].filter((item) => item !== value);
            return {
                ...prevProduct,
                [type]: updatedArray,
            };
        });
    };

    const handleFileChange = (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: Array.from(e.target.files),
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        postProduct(product);
    };
    
    return (
        <div className='add-product-container'>
            <form className='product-form' onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
                <input 
                    type='text' 
                    name='name' 
                    value={product.name} 
                    onChange={handleChange} 
                    placeholder='Product Name' 
                />
                
                <textarea 
                    name='description' 
                    value={product.description} 
                    onChange={handleChange} 
                    placeholder='Product Description' 
                />

                <input 
                    type='number' 
                    name='price' 
                    value={product.price} 
                    onChange={handleChange} 
                    placeholder='Price'
                />

                <label>Category:</label>
                <div className='radio-group'>
                    <input 
                        type='radio' 
                        name='category' 
                        value='men' 
                        checked={product.category === 'men'} 
                        onChange={handleCategoryChange} 
                    /> Men
                    <input 
                        type='radio' 
                        name='category' 
                        value='women' 
                        checked={product.category === 'women'} 
                        onChange={handleCategoryChange} 
                    /> Women
                    <input 
                        type='radio' 
                        name='category' 
                        value='kids' 
                        checked={product.category === 'kids'} 
                        onChange={handleCategoryChange} 
                    /> Kids
                </div>

                <label>Select Images:</label>
                <input 
                    type='file' 
                    multiple 
                    accept='image/*' 
                    onChange={handleFileChange} 
                />

                <label>Size:</label>
                <div className='checkbox-group'>
                    {['xs', 's', 'm', 'l', 'xl', 'xxl'].map((size) => (
                        <label key={size}>
                            <input 
                                type="checkbox" 
                                value={size} 
                                checked={product.size.includes(size)} 
                                onChange={(e) => handleCheckboxChange(e, 'size')}
                            /> {size.toUpperCase()}
                        </label>
                    ))}
                </div>

                <label>Color:</label>
                <div className='checkbox-group'>
                    {['red', 'blue', 'green', 'yellow', 'black', 'white'].map((color) => (
                        <label key={color}>
                            <input 
                                type="checkbox" 
                                value={color} 
                                checked={product.color.includes(color)} 
                                onChange={(e) => handleCheckboxChange(e, 'color')}
                            /> {color.charAt(0).toUpperCase() + color.slice(1)}
                        </label>
                    ))}
                </div>

                <label>Featured: </label>
                <div className='radio-group'>
                    <input 
                        type='radio' 
                        name='featured' 
                        value='true' 
                        checked={product.featured === 'true'} 
                        onChange={handleFeaturedChange} 
                    /> Yes
                    <input 
                        type='radio' 
                        name='featured' 
                        value='false' 
                        checked={product.featured === 'false'} 
                        onChange={handleFeaturedChange} 
                    /> No
                </div>

                <button type='submit' className='add-product-button' disabled={loading}>
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
                {error && <p className="error-message">Error: {error}</p>}
                {success && <p className="success-message">Product added successfully!</p>}
            </form>
        </div>
    );
}
