const {Category} = require('../models/category');
const {Product} = require('../models/product')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) =>{
    try {
        let filter = {};
        if (req.query.categories){
            filter = {category: req.query.categories.split(',')}
        }

        const productList = await Product.find(filter).populate('category'); 

        if (!productList){
            res.status(500).json({success:false})
        }

        res.send(productList);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get(`/:id`, async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id).populate('category'); 

        if (!product){
            res.status(500).json({success:false})
        }

        res.send(product);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.post(`/`, async (req, res) =>{
    try {
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).send("Categoria Invalida")
        }

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            dimension: req.body.dimension,
            price: req.body.price,
            category: req.body.category,
            metersInStock: req.body.metersInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        })

        product = await product.save();

        if (!product){
            return res.status(500).send('O produto não pode ser criado')
        }
        res.send(product);

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/:id', async(req, res)=> {
    try {
        if (mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Produto ID Invalido")
        }
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).send("Categoria Invalida")
        }
    
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                dimension: req.body.dimension,
                price: req.body.price,
                category: req.body.category,
                metersInStock: req.body.metersInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            {new: true}
        )
        if (!product){
            res.status(500).json({success:false, message: 'Lista de Produtos Inexistente'})
        }
    
        res.status(200).send(product);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.delete('/:id', (req, res) =>{
    try {
        Product.findByIdAndDelete(req.params.id).then(product =>{
            if (product){
                return res.status(200).json({success: true, message: 'Produto Deletado'})
            }else{
                return res.status(404).json({success: false, message: 'Produto não encontrado'})
            }
        }).catch(err =>{
            return res.status(400).json({success: false, error: err})
        })
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get(`/get/count`, async (req, res) =>{
    try {
        const productCount = await Product.countDocuments();

        if (!productCount){
            res.status(500).json({success:false})
        }

        res.send({count: productCount});
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get(`/get/featured/:count`, async (req, res) =>{
    try {
        const count = req.params.count ? req.params.count : 0
        const products = await Product.find({isFeatured: true}).limit(+count)

        if (!products){
            res.status(500).json({success:false})
        }

        res.send(products);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = router;