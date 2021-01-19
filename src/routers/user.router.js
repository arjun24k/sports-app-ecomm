const express = require('express');
const { User } = require('../models/user.model');
const {errorParse} = require('../errorParse');
const { auth } = require('../middlewares/auth.middleware');
const userRouter = new express.Router();

userRouter.post('/signup',async (req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
    } catch (error) {
        console.log(error);
        res.status(400).send(errorParse(error))
    }
});

userRouter.post('/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
    } catch (error) {
        res.status(400).send(errorParse(error));
    }
});

userRouter.post('/logout',auth,async(req,res)=>{
    console.log(req.user);
    try {
        req.user.tokens = req.user.tokens.filter(token=>{
            return token.token!==req.token;
        });
        await req.user.save();
        res.send({success:true})
    } catch (error) {
        res.status(400).send(errorParse(error));
    }
});

module.exports={
    userRouter
}