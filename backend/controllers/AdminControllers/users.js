import User from "../../models/user.js";
import Orders from "../../models/orders.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({'message' : 'success', users });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const updateUsers = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, role } = req.body;

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
            user.name = name;
            user.role = role;
            await user.save();
            res.json({ message: 'success', user });
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

export const getOrders = async (req, res)=>{
    try{
        const orders = await Orders.find({});
        res.json({'message':'success', orders});

    }catch(error){
        res.status(500).json({ message: 'Server Error' });

    }
}

export const updateOrders = async (req, res)=>{
    const {paymentStatus, orderStatus, shippingId} = req.body;
    // console.log('updateOrders');
    
    try{
        const {orderId} = req.params;
        // console.log(orderId);
        // console.log(req.body);
        
        
        const order = await Orders.findOne({orderId});
        // console.log(order);

        if(!order){
            res.status(404).json({message: 'Order not found'});
            return;
        }else{
            order.orderStatus = orderStatus;
            order.paymentStatus = paymentStatus;
            order.shippingId = shippingId;
        }
        await order.save();
        res.json({'message':'success', order});

        }catch(error){
            res.status(500).json({ message: 'Server Error' });
            }
            
}