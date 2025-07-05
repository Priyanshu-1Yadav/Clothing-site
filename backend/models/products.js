import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },   
    size: { 
        type: [String], 
        required: true 
    }, 
    color: { 
        type: [String], 
        required: true 
    },
    rating: { 
        type: Number, 
    }, 
    inStock: { 
        type: Boolean, 
        // required: true 
    },
    isFeatured: { 
        type: Boolean, 
        default: false 
    },
    images: { 
        type: [String], 
        required: true 
    },  
});

const Product = mongoose.model('Product', productSchema);
export default Product;
