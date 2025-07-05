import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true // Ensure the custom user ID is unique
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true // Ensure email is unique
    },
    mobile: { 
        type: String, 
        required: true,
        unique: true // Ensure mobile number is unique
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
export default User;
