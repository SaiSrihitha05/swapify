const exp = require('express')
const app = exp()
require('dotenv').config()
const path = require('path')
const mongoClient = require('mongodb').MongoClient;
app.use(exp.static(path.join(__dirname,'../react/first/build')))

app.use(exp.json())


mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const swapifydb = client.db('swapifydb')
    const buyersCollection = swapifydb.collection('buyersCollection')
    const sellersCollection = swapifydb.collection('sellersCollection')
    const productsCollection = swapifydb.collection('productsCollection')

    app.set('buyersCollection',buyersCollection)
    app.set('sellersCollection',sellersCollection)
    app.set('productsCollection',productsCollection)

    console.log('DB Connection Success')
})
.catch(err=>{
    console.log(err)
})

const buyerApp = require('./API/buyer-api')
const sellerApp = require('./API/seller-api')


app.use('/seller-api',sellerApp)
app.use('/buyer-api',buyerApp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../react/first/build/index.html'))
})

app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
//assign port number
const port = process.env.PORT || 5000;//if port number not specified it takes 5000
app.listen(port,()=>{console.log(`server on port ${port}`)})