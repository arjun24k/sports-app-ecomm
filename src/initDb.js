const mongoose = require('mongoose');
const connectionUrl = process.env.MONGO_DB_URL;

const initDb = async () =>{
    try {
        await mongoose.connect(connectionUrl,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    initDb
}