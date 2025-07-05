import Product from '../models/products.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProduct = async (req, res) => {
    try {
        
        const productId = req.params.id;
        const product = await Product.findOne({id: productId});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); // Respond with the fetched product
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

