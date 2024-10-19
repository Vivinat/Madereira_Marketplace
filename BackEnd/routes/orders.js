const {Order} = require('../models/order')
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    try {
        const orderList = await Product.find(); 

        if (!orderList){
            res.status(500).json({success:false})
        }

        res.send(orderList);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;