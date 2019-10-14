const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'plse mention your name']

    },
    email:{
        type:String,
        required:[true,'enter the email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'please enter the valid email id']
    },
    phone:String,
    password:{
        type:String,
        required:[true,'enter the password'],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,'plse confirm your password'],
        validate:{
            validator: function(el){
                return el === this.password
            },
            message: 'password are not same'
        }
    }

});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();

});

const User = mongoose.model('User',userSchema);

module.exports = User;