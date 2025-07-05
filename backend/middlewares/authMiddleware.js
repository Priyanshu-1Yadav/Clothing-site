import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const authenticate = (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');
//   console.log("token: ",token);
  
  if (!token) {
    return res.status(401).json({ msg: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded", decoded);
    
    req.user = decoded.user;
    // console.log("Req.user", req.user);
    
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token expired or invalid' });
  }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ id: req.user.id, email: req.user.email });

        // console.log("User: ", user);
        
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({ message: 'Error Authenticating' });
    }

    }; 

