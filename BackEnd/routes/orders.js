const {Order} = require('../models/order')
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    try {
        const orderList = await Order.find().populate('user').sort({'dateOrdered': -1}); 

        if (!orderList){
            res.status(500).json({success:false})
        }

        res.send(orderList);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get(`/:id`, async (req, res) =>{
    try {
        const order = await Order.findById(req.params.id)
        .populate('user').sort({'dateOrdered': -1})
        .populate(
            {path: 'orderItems', populate: 
                {path: 'product', populate: 'category'}
            });

        if (!order){
            res.status(500).json({success:false})
        }

        res.send(order);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


router.post('/', async (req, res)=>{
    try {
        const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }))
        const orderItemsIdsResolved = await orderItemsIds;

        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) =>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }))

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0); // Somando todos os preços

        
        let order = new Order({
            orderItems: orderItemsIdsResolved,
            adress: req.body.adress,
            city: req.body.city,
            cep: req.body.cep,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user,
        })
        order = await order.save();
    
        if (!order){
            return res.status(404).send('Ordem não pode ser criada')
        }
        res.send(order);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/:id', async(req, res)=> {      //Put muda apenas o status do pedido
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {new: true}
        )
        if (!order){
            res.status(400).json({success:false, message: 'Ordem Inexistente'})
        }
    
        res.status(200).send(order);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.delete('/:id', (req, res) =>{
    try {
        Order.findByIdAndDelete(req.params.id).then(async order =>{
            if (order){
                await order.orderItems.map(async orderItem => {
                    await OrderItem.findByIdAndDelete(orderItem)
                })
                return res.status(200).json({success: true, message: 'Pedido Deletado'})
            }else{
                return res.status(404).json({success: false, message: 'Pedido não encontrado'})
            }
        }).catch(err =>{
            return res.status(400).json({success: false, error: err})
        })
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get('/get/vendastotais', async (req, res) =>{
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id:null, totalsales: { $sum: '$totalPrice'}}}
        ])
    
        if (!totalSales){
            res.status(400).send('Pedidos nao foram carregados');
        }
    
        res.send({totalsales: totalSales.pop().totalsales}) 
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get(`/get/count`, async (req, res) =>{
    try {
        const orderCount = await Order.countDocuments();

        if (!orderCount){
            res.status(500).json({success:false})
        }

        res.send({count: orderCount});
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get(`/get/userorders/:userid`, async (req, res) =>{
    try {
        const userorderList = await Order.find({user: req.params.userid}).populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        }).sort({'dateOrdered': -1})

        if (!userorderList){
            res.status(500).json({success:false})
        }

        res.send(userorderList);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;