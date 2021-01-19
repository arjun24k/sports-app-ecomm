const jwt = require('jsonwebtoken');
const errorParse = require('../errorParse');
const {User} = require('../models/user.model');

const auth = async (req,res,next)=>{
    try {
        const token = req.header('authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user)
            throw new Error('User not found');
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).send({error:true})
    }
}

module.exports={
    auth
}