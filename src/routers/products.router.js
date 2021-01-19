const express = require('express');
const errorParse = require('../errorParse');
const { auth } = require('../middlewares/auth.middleware');
const { Product } = require('../models/products.model');
const productRouter = new express.Router();


const category = [
    'Sports Accessories',
    'Shoes',
    'Clothing - Men and Women',
];

productRouter.get('/getProducts',auth,async (req,res)=>{
    try {
        const products = await Product.find({}).populate('category').exec();
        const uid=req.user._id.toString();
    const productList = {
        sportsAccList:[],
        shoesList:[],
        clothingList:[],
        bestSellersList:[],
        cartItems:[]
    };
    products.forEach(product=>{
        if(product.isBestSeller)
            productList.bestSellersList.push(product);
        if(product.userCartList.find(id=>uid===id.toString())){
            productList.cartItems.push(product);
        }
        if(product.category.categoryName===category[0]){
            productList.sportsAccList.push(product);
        }
        else if(product.category.categoryName===category[1]){
            productList.shoesList.push(product);
        }
        else if(product.category.categoryName===category[2]){
            productList.clothingList.push(product);
        }
    })      
        res.status(200).send(productList);
    } catch (error) {
        console.log(error)
        res.status(400).send({error:true});
    }
});


productRouter.post('/addToCart',auth,async (req,res)=>{
    try {
        const productId = req.body.productId;
        const uid = req.user._id;
        console.log(productId,uid)
        const product = await Product.findById(productId);
        if(!product.userCartList.indexOf(uid)>-1)
            product.userCartList.push(uid);
        else
            throw new Error('Item exists');
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }
});


productRouter.post('/removeFromCart',auth,async (req,res)=>{
    try {
        const productId = req.body.productId;
        const product = await Product.findById(productId);
        product.userCartList.filter((id)=>id!==req.user._id);
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send({error:true});
    }
});

productRouter.post('/purchaseProduct',auth,async (req,res)=>{
    try {
        const productList = req.body.productList;console.log(productList)
        productList.forEach(async product=>{
            const productId = product._id;
            const prod = await Product.findById(productId);
            prod.userPurchaseList.push(req.user._id);
            await prod.save();
        });
        res.status(200).send({success:true});
    } catch (error) {
        console.log(error)
        res.status(400).send({error:true})
    }
});

module.exports={
    productRouter
}
