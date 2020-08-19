const mongoose = require('mongoose')
const Shopkeeper = mongoose.model('Shopkeeper')

module.exports = app =>{
    app.post('/vendor/registration',async(req, res)=>{
        const userexists = await Shopkeeper.findOne({mobile:req.body.mobile})
        if(userexists){
            res.json({error:'user already exists'})
        }
            const user =await new Shopkeeper(req.body)
           await user.save()
           res.json({message:"successfully registration "})
    })
    app.post('/vendor/login', async(req, res) => {
        const user = await Shopkeeper.findByCredentials(req.body.mobile,req.body.password)
        res.json({user})
    })

    app.get('/vendor/list',async(req, res) => {
        try{
             const vendor = await Shopkeeper.find({})
             res.json({vendor})
        }catch(err){
            res.status(400).json({vendor: err})
        }
    })
}