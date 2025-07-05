import Product from '../../models/products.js';

const generateUniqueId = async ()=>{
    const count = await Product.countDocuments();
    return count + 1;
}

export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category,featured, size, color } = req.body;
        // console.log(req.body);
        // console.log(req.files);
        
        
        const imagePaths = req.files.map(file => file.path);
        const productId = await generateUniqueId();

        const newProduct = new Product({
            id: productId,
            name,
            category,
            price,
            description,
            size,
            color,
            inStock: true,
            isFeatured: featured === 'true' ? true : false,
            images: imagePaths,
        });

        await newProduct.save();
        console.log(newProduct);
        
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProducts = async (req, res) => {

    const {productId} = req.params;
    const {name, type, price, description, stock, category } = req.body

    try {
        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name;
        // product.type = type;
        product.price = price;
        product.description = description;
        product.inStock = stock;
        product.category = category;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });

        } catch (error) {

            res.status(500).json({ error: error.message });

            }

}
