const mongoose = require('mongoose')
const Node = mongoose.model('Node')

module.exports = app =>{
    app.post('/user/registration',async(req, res)=>{
        const userexists = await Node.findOne({Username:req.body.Username})
        if(userexists){
            res.json({error:'user already exists'})
        }
        const user =await new Node(req.body)
           await user.save()
           res.json({message:"successfully registration "})
    })

    app.post('/user/login', async(req, res) => {
        const user = await Node.findByCredentials(req.body.Username,req.body.password)
        res.json({user})
    })
}