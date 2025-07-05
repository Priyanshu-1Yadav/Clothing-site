import Coupon from '../../models/coupons.js'

export const addCoupon = async (req, res) => {
    const { couponCode, couponType, discountAmount, discountPercentage, expiryDate, minimumItemQuantity, minPurchaseAmount, maxPurchaseAmount, maxDiscountAmount, isActive, usageLimit, userLimit, description } = req.body;

    try {
        const existingCoupon = await Coupon.findOne({ couponCode });

        if (existingCoupon) {
            return res.status(400).json({ message: 'Coupon already exists', error: 'Coupon code already exists' });
        }

        const newCoupon = new Coupon({
            couponCode,
            couponType,
            discountAmount,
            discountPercentage,
            expiryDate,
            minimumItemQuantity,
            minPurchaseAmount,
            maxPurchaseAmount,
            maxDiscountAmount,
            isActive,
            usageLimit,
            userLimit,
            description
        });

        await newCoupon.save();
        // console.log(newCoupon);
        res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({ coupons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCoupons = async (req, res) => {
    const {
        couponType,
        discountAmount,
        discountPercentage,
        expiryDate,
        minimumItemQuantity,
        minPurchaseAmount,
        maxDiscountAmount,
        usageLimit,
        userLimit,
        isActive,
        description,
    } = req.body;
    const { couponCode } = req.params;

    try {
        // Check if the coupon exists
        const existingCoupon = await Coupon.findOne({ couponCode });
        if (!existingCoupon) {
            return res.status(404).json({ message: 'Coupon not found', error: 'Coupon not found' });
        }

        // Update fields dynamically
        if (couponType) existingCoupon.couponType = couponType;
        if (discountAmount) existingCoupon.discountAmount = discountAmount;
        if (discountPercentage) existingCoupon.discountPercentage = discountPercentage;
        if (expiryDate) existingCoupon.expiryDate = new Date(expiryDate);
        if (minimumItemQuantity) existingCoupon.minimumItemQuantity = minimumItemQuantity;
        if (minPurchaseAmount) existingCoupon.minPurchaseAmount = minPurchaseAmount;
        if (maxDiscountAmount) existingCoupon.maxDiscountAmount = maxDiscountAmount;
        if (usageLimit) existingCoupon.usageLimit = usageLimit;
        if (userLimit) existingCoupon.userLimit = userLimit;
        if (isActive) existingCoupon.isActive = isActive;
        if (description) existingCoupon.description = description;

        // Save the updated coupon
        await existingCoupon.save();

        res.status(200).json({ message: 'Coupon updated successfully', coupon: existingCoupon });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

