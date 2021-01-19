const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Email is invalid')
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password is invalid')
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
});

userSchema.virtual('cartProducts',{
    ref:'Products',
    localField:'_id',
    foreignField:'userCartList'
});

userSchema.virtual('purchasedProducts',{
    ref:'Products',
    localField:'_id',
    foreignField:'userPurchaseList'
});

userSchema.methods.toJSON = function(){
    //fn runs before user obj sent back to user , automatically
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email,password) =>{
    console.log(email,password);
    const user = await User.findOne({email});
    if(!user)
        throw new Error('User does not exist');
    const isValid =await bcrypt.compare(password,user.password);
    if(!isValid)
        throw new Error('Invalid credentials');   
    return user;
}


userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
});

const User = mongoose.model('Users',userSchema);

module.exports={
    User
}