const {User} = require('../models/user')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    try {
        const userList = await User.find().select('-passwordHash'); 

        if (!userList){
            res.status(500).json({success:false})
        }

        res.send(userList);
    } catch (error) {
        return res.status(404).send(error.message)
    }
}) 

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user){
            res.status(500).json({success:false, message: 'User com Id informado não-encontrado'})
        }

        res.status(200).send(user);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.post('/', async (req, res)=>{        //Para admin adicionar alguem
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 17),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            cep: req.body.cep,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street
        })
        user = await user.save();
    
        if (!user){
            return res.status(404).send('Usuário não pode ser criado')
        }
        res.send(user);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.post('/register', async (req, res)=>{    //Apenas para user comum
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 17),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            cep: req.body.cep,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street
        })
        user = await user.save();
    
        if (!user){
            return res.status(404).send('Usuário não pode ser criado')
        }
        res.send(user);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.delete('/:id', (req, res) =>{
    try {
        User.findByIdAndDelete(req.params.id).then(user =>{
            if (user){
                return res.status(200).json({success: true, message: 'Usuario Deletado'})
            }else{
                return res.status(404).json({success: false, message: 'Usuario não encontrado'})
            }
        }).catch(err =>{
            return res.status(400).json({success: false, error: err})
        })
    } catch (error) {
        return res.status(404).send(error.message) 
    }
})

router.get('/get/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        if (!userCount) {
        res.status(500).json({ success: false });
        }
        res.send({ count: userCount });
    } catch (error) {
        return res.status(404).send(error.message) 
    }
})

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        const secret = process.env.secret;
        if (!user) {
            return res.status(400).send('Usuario nao encontrado');
        }

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn : '1d'}
            )
            res.status(200).send({user: user.email , token: token});
        }else{
            res.status(400).send('Senha incorreta');
        }
    } catch (error) {
        return res.status(404).send(error.message) 
    }
})

module.exports = router;