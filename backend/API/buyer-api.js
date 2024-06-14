const exp = require('express');
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verifyToken');
require('dotenv').config();
const buyerApp = exp.Router();

let buyersCollection;
let productsCollection;

buyerApp.use((req, res, next) => {
    buyersCollection = req.app.get('buyersCollection');
    productsCollection = req.app.get('productsCollection');
    next();
});

buyerApp.get('/products', verifyToken, expressAsyncHandler(async (req, res) => {
    try {
        const products = await productsCollection.find({ status: true }).toArray();
        res.status(200).send({ message: "Products retrieved successfully", payload: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));

buyerApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newBuyer = req.body;
    const dbUser = await buyersCollection.findOne({ username: newBuyer.username });
    if (dbUser) {
        res.send({ message: "User Existed" });
    } else {
        const hashedPass = await bcryptjs.hash(newBuyer.password, 6);
        newBuyer.password = hashedPass;
        await buyersCollection.insertOne(newBuyer);
        res.send({ message: "User Created" });
    }
}));

buyerApp.post('/login', expressAsyncHandler(async (req, res) => {
    const buyerCred = req.body;
    console.log('Received login request:', buyerCred);

    const dbUser = await buyersCollection.findOne({ username: buyerCred.username });
    console.log('Database User:', dbUser);

    if (dbUser === null) {
        console.log('Invalid Username');
        res.status(401).send({ message: "Invalid Username" });
    } else {
        try {
            const status = await bcryptjs.compare(buyerCred.password, dbUser.password);
            console.log('Bcrypt Comparison Result:', status);

            if (!status) {
                console.log('Invalid Password');
                res.status(401).send({ message: "Invalid Password" });
            } else {
                const signedToken = jwt.sign({ "username": dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                console.log('Login success');
                res.status(200).send({ "message": "login success", token: signedToken, user: dbUser });
            }
        } catch (error) {
            console.error('Error during password comparison:', error);
            res.status(500).send({ "message": "Internal Server Error" });
        }
    }
}));

buyerApp.post('/checkout', verifyToken, expressAsyncHandler(async (req, res) => {
    try {
        const { productName, price } = req.body;
        const userId = req.user.id; // Assuming the token contains the user's id

        // Here you would handle the order confirmation logic
        // For demonstration purposes, let's say the order is confirmed if the product name and price are provided
        if (productName && price) {
            // Perform any additional validation or processing here
            
            // If all checks pass, mark the payment as confirmed
            const paymentConfirmed = true;

            if (paymentConfirmed) {
                // Return a success response if payment is confirmed
                res.status(200).json({ success: true, message: 'Order confirmed successfully' });
            } else {
                // Return an error response if payment confirmation fails
                res.status(400).json({ success: false, message: 'Failed to confirm order' });
            }
        } else {
            // Return an error response if product details are missing
            res.status(400).json({ success: false, message: 'Product details missing. Please provide product name and price' });
        }
    } catch (error) {
        // Return an error response if any unexpected error occurs
        console.error('Error confirming order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}));



buyerApp.post('/cart', verifyToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // assuming the token contains the user's id

        // Fetch the user's cart
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists for the user
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex >= 0) {
                // If product already exists in cart, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Else, add the new product to the cart
                cart.products.push({ productId, quantity });
            }

            await cart.save();
            res.json({ message: "Product added to cart", cart });
        } else {
            // If no cart exists for the user, create a new one
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }],
            });

            await newCart.save();
            res.json({ message: "Product added to cart", cart: newCart });
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: "Failed to add product to cart", error: error.message });
    }
});



buyerApp.post('/comment/:productId', verifyToken, expressAsyncHandler(async (req, res) => {
    const userComment = req.body;
    const productId = +req.params.productId;
    console.log(userComment);
    try {
        const result = await productsCollection.updateOne(
            { productId: productId },
            { $addToSet: { comments: userComment } }
        );
        console.log(result);
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Comment Added" });
        } else {
            res.status(400).send({ message: "Comment not added, product not found" });
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));

// Export buyer app
module.exports = buyerApp;
