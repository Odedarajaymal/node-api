const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const {Schema} = mongoose

const shopkeeperSchema = new Schema({
    mobile:{
        type: Number, 
        trim:true,
        min:10
    },password:{
        type: String
    },
    title:{type: String},
    description:{type: String},
    price:{type: Number}
})


shopkeeperSchema.statics.findByCredentials = async(mobile,password) =>{
    const user = await Shopkeeper.findOne({mobile})
    if(!user){
         throw new Error("User not found")
    }
    const match = await bcrypt.compare(password,user.password)
      if(!match){
          throw new Error("Unable to login")
      }
      return user
}
shopkeeperSchema.pre('save',async function(next){
    const shopkeeper = this
    if(shopkeeper.isModified('password')){
        shopkeeper.password = await bcrypt.hash(shopkeeper.password,9)
    }
     next()
})

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema)
module.exports = Shopkeeper