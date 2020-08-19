const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const {Schema} = mongoose

const userSchema = new Schema({
    Username:{
        type: String, 
        trim:true
    },password:{
        type: String
    }
})

userSchema.statics.findByCredentials = async(Username,password) =>{
    const user = await Node.findOne({Username})
    if(!user){
         throw new Error("User not found")
    }
    const match = await bcrypt.compare(password,user.password)
      if(!match){
          throw new Error("Unable to login")
      }
      return user
}


userSchema.pre('save',async function(next){
    const node = this
    if(node.isModified('password')){
        node.password = await bcrypt.hash(node.password,9)
    }
     next()
})
const Node = mongoose.model('Node', userSchema)
module.exports = Node