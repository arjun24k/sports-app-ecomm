const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    itemName:{
        type:String,
        trim:true,
    },
    actualCost:{
        type:String,
        trim:true
    },
    discountedCost:{
        type:String,
        trim:true
    },
    rating:{
        type:Number,
    },
    isBestSeller:{
        type:Boolean
    },
    imageLink:{
        type:String,
        trim:true
    },
    userCartList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users'
    },
    userPurchaseList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
});


const Product = mongoose.model('Product',productSchema);

module.exports={
    Product
}