const exp = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const verifyToken = require('../Middlewares/verifyToken')
const sellerApp = exp.Router()

let sellersCollection;
let productsCollection;

sellerApp.use((req,res,next)=>{
    sellersCollection = req.app.get('sellersCollection')
    productsCollection = req.app.get('productsCollection')
    next()
})

sellerApp.post('/product',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newProduct = req.body;
    console.log(newProduct)
    await productsCollection.insertOne(newProduct)
    res.send({message:"Product Added"})
}))

sellerApp.put('/product',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedProduct = req.body;
    let result = await productsCollection.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}})
    console.log(result)
    let latestProduct = await productsCollection.findOne({productId:modifiedProduct.productId})
    res.send({message:"Product Details Modified",product:latestProduct})
}))

sellerApp.get('/products', expressAsyncHandler(async (req, res) => {
    const productsCollection = req.app.get('productsCollection'); 
    let products = await productsCollection.find().toArray(); 
    res.send({ message: "This from user app", payload: products });
}))

//delete article by it's id
sellerApp.put('/product/:productId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const productIdFromUrl = (+req.params.productId);
    const productToDelete = req.body;
    console.log(productToDelete.status)
    if(productToDelete.status === true){
        let modifiedPro = await productsCollection.findOneAndUpdate({productId:productIdFromUrl},{$set:{...productToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"Product Deleted",payload:modifiedPro.status})
    }

    if(productToDelete.status === false){
        let modifiedPro = await articlesCollection.findOneAndUpdate({productId:productIdFromUrl},{$set:{...productToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"Product Restored",payload:modifiedPro.status})
    }
}))

sellerApp.get('/products/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    const usernameReceived = req.params.username
    let allProducts = await productsCollection.find({username:usernameReceived}).toArray()
    console.log(allProducts)
    res.send({message:"All Products",payload:allProducts})
}))


sellerApp.post('/user',expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    const newSeller = req.body
    const dbUser = await sellersCollection.findOne({username:newSeller.username})
    if(dbUser){
        res.send({message:"User Existed"})
    }else{
        const hashedPass = await bcryptjs.hash(newSeller.password,6)
        newSeller.password = hashedPass
        await sellersCollection.insertOne(newSeller)
        res.send({message:"User Created"})
    }
}))


sellerApp.post('/login', expressAsyncHandler(async (req, res) => {
    const sellerCred = req.body;
    console.log('Received login request:', sellerCred);

    const dbUser = await sellersCollection.findOne({ username: sellerCred.username });
    console.log('Database User:', dbUser);

    if (dbUser === null) {
        console.log('Invalid Username');
        res.status(400).send({ "message": "Invalid Username" });
    } else {
        try {
            const status = await bcryptjs.compare(sellerCred.password, dbUser.password);
            console.log('Bcrypt Comparison Result:', status);

            if (status === false) {
                console.log('Invalid Password');
                res.status(401).send({ "message": "Invalid Password" });
            } else {
                const signedToken = jwt.sign({ "username": dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                console.log('Login success');
                res.send({ "message": "login success", token: signedToken, seller: dbUser });
            }
        } catch (error) {
            console.error('Error during password comparison:', error);
            res.status(500).send({ "message": "Internal Server Error" });
        }
    }
}));



module.exports = sellerApp;