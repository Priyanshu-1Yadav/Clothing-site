import Order from "../models/orders.js"


    const generateOrderId = () => {
        return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    };

export const createOrder = async (req, res) => {
    try {
        const {id, email} = req.user;
        const {orderedItems, subtotal, discountCode, discountedAmount, totalPrice, shippingAddress, paymentMethod, paymentStatus, orderStatus } = req.body;
        // console.log(req.body);
        
        const orderData = { 
            orderId: generateOrderId(),
            userId: id,
            userEmail: email,
            orderedItems,
            subtotal,
            discountCode,
            discountedAmount,
            totalPrice,
            shippingAddress,
            paymentMethod,
            paymentStatus,
            orderStatus,
            shippingId: '',
        };

        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully.', newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res)=>{
    try{
        const {id} = req.user;
        // console.log(userId);

        const Orders = await Order.find({userId: id});
        
        if(Orders.length >0){
            res.status(200).json({message: 'Order data fetched successfully.', Orders})
        }else{
            res.status(404).json({message: 'No orders found.'})
        }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}