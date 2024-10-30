const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
 const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
 });


userSchema.pre("save", async function (next) {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(error){
        next(error)
    }
})


userSchema.methods.isValidPassword = async function (password) {
    try{
        return await bcrypt.compare(password, this.password);
    }
    catch(error){
        throw error;
    }
}




 const user = mongoose.model('user', userSchema);
 module.exports = user;