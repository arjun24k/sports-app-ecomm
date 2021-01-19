const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const {initDb} = require('./initDb');
const {userRouter} = require('./routers/user.router');
const { productRouter } = require('./routers/products.router');
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../client/build')));
    app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'../client/build','index.html')));
}

app.use(cors());
app.use(express.json());
initDb();

app.listen(port,()=>{
    console.log('Server up and running');
});

app.use(userRouter)
app.use(productRouter)

/* 
const fn = ()=>{
    category.map(async category=>{
        const cat = new Category({categoryName:category});
        await cat.save();
    })
}
const funct = async ()=>{
    const products = await Product.find({}).populate('category').exec();
    console.log(products);
}
Product.find({}).populate('category').exec((a,b)=>{
    console.log(b);
});  


const category = [
    'Sports Accessories',
    'Shoes',
    'Clothing - Men and Women',
];
const funct = async ()=>{
    const products = await Product.find({}).populate('category').exec();
    var i=0;
   for (let index = 0; index < products.length; index++) {
    if(products[index].category.categoryName===category[0]){
        if(i<3){
            products[index].isBestSeller=true;
        }
        else{
            products[index].isBestSeller=false;
        }
}
else if(products[index].category.categoryName===category[1]){
    if((Math.random()*10+1)>6){
        products[index].isBestSeller=true;
    }
    else{
        products[index].isBestSeller=false;
    }
}
else if(products[index].category.categoryName===category[2]){
    if((Math.random()*10+1)>6){
        products[index].isBestSeller=true;
    }else{
        products[index].isBestSeller=false;
    }
}
    i++;   
   }
   products.forEach(async product=>{
       await Product.updateOne({_id:product._id},{isBestSeller:product.isBestSeller});
   })
    //console.log(products.map(product=>product.isBestSeller));
}
funct();


const products = [
    [
        {
        itemName:"Cosco Max Power Aluminium Tennis RacquetCosco Tennis raq",
        actualCost:"2799",
        discountedCost:"1399",
        imageLink:"https://images-na.ssl-images-amazon.com/images/I/81AMhpsIBSL._SL1500_.jpg",
        rating:5
        },
        {
            itemName:"Solimo Leather Cricket Ball, Set of 2",
            actualCost:"2799",
            discountedCost:"1399",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/81J9U%2BHqN9L._SL1500_.jpg",
            rating:4
        },{
            itemName:"SYNPLAY Rubber Trainer Basketball, Size 7 (Orange)",
            actualCost:"2799",
            discountedCost:"1399",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/810gpJRlGBL._SL1500_.jpg",
            rating:4
        },
        {
            itemName:"Nivia 1019 Football, Youth Size 5",
            actualCost:"2799",
            discountedCost:"1399",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/81-2ZIdZ58L._SL1500_.jpg",
            rating:4.5
        },
        {
            itemName:"Palio Expert 3.0 Table Tennis Racket & Case",
            actualCost:"2799",
            discountedCost:"1399",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/91hx2abnf%2BL._SL1500_.jpg",
            rating:5
        },
        {
            itemName:"Table Tennis Balls 6pc 40mm",
            actualCost:"2799",
            discountedCost:"1399",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/51uwu%2B09WTL._SL1000_.jpg",
            rating:4.5
        }
    ],
    [
        { itemName:"ALICON Amico Air Mesh Casual Sneaker Shoes for Mens",
         actualCost:"1799",
         discountedCost:"1399",
         imageLink:" https://images-na.ssl-images-amazon.com/images/I/61stT9w0HZL._UL1280_.jpg",
         rating:4.5},
         { itemName:"Campus Sutra Casual Flyte Foamy Shoes",
         actualCost:"1899",
         discountedCost:"1399",
         imageLink:"https://cms-static.asics.com/media-libraries/36731/file.jpg?20201013085539",
         rating:4},
         { itemName:"Alnico Comfortable Casual Shoes ",
         actualCost:"1799",
         discountedCost:"1399",
         imageLink:" https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_450,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/categoryCarouselCard/en-US/images/3SIs1eQwd7uJHonZHJX4gA/2",
         rating:5},
         { itemName:"Nike adapt self lacing shoes",
         actualCost:"5799",
         discountedCost:"4399",
         imageLink:" https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682",
         rating:4},
         { itemName:"Hiking shoes for men",
         actualCost:"2799",
         discountedCost:"1399",
         imageLink:"https://contents.mediadecathlon.com/p1647818/5eefdaaffcb8c67e0c6952899d45cdd1/p1647818.jpg?f=650x650",
         rating:5}
     ],
    [
        {   
            itemName:"Campus Sutra Men's Regular Fit Jersey",
            actualCost:"799",
            discountedCost:"399",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/61KVIeb52cL._UL1000_.jpg",
            rating:5
        },
        {   
            itemName:"NIVIA Hydra-1 Fitness Female Full Sleeve T-Shirt",
            actualCost:"499",
            discountedCost:"299",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/61SJ%2B2d0d5L._SL1500_.jpg",
            rating:4
        },
        {   
            itemName:"Reebok Men's Slim Track Pants",
            actualCost:"599",
            discountedCost:"499",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/81WT8LNW75L._UL1500_.jpg",
            rating:5
        },
        {   
            itemName:"CHKOKKO Men Gym Tank Top",
            actualCost:"399",
            discountedCost:"299",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/71o6-xRu9dL._UL1500_.jpg",
            rating:4.5
        },
        {   
            itemName:"Neo Garments Men's Regular Shorts",
            actualCost:"499",
            discountedCost:"299",
            imageLink:"https://images-na.ssl-images-amazon.com/images/I/61Wwamh6HfL._UL1500_.jpg",
            rating:5
        },
    ],
]



Category.find({}).then(async cat=>{
    var i =0;
    products.forEach(async productCategory=>{
        productCategory.forEach(async product=>{
            const item= new Product({
                itemName:product.itemName,
                actualCost:product.actualCost,
                discountedCost:product.discountedCost,
                imageLink:product.imageLink,
                isBestSeller:false,
                rating:product.rating,
                category:cat[i]._id
            });
            await item.save();
        });
        i++;
    });
})

 */









