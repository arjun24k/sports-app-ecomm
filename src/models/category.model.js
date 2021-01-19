const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        trim:true
    },
});


categorySchema.virtual('products',{
    ref:'Product',
    localField:'_id',
    foreignField:'category'
});

const Category = mongoose.model('Category',categorySchema);

module.exports={
    Category
}

