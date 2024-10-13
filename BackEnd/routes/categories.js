const {Category} = require('../models/category')
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoriesList = await Category.find(); 

    if (!categoriesList){
        res.status(500).json({success:false, message: 'Lista de Categorias Inexistente'})
    }

    res.status(200).send(categoriesList);
})

router.put('/:id', async(req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
        },
        {new: true}
    )
    if (!category){
        res.status(500).json({success:false, message: 'Lista de Categorias Inexistente'})
    }

    res.status(200).send(category);
})

router.get('/:id', async(req, res) => {
    const category = await Category.findById(req.params.id);
    if (!categoriesList){
        res.status(500).json({success:false, message: 'Categoria com Id informado não-encontrada'})
    }

    res.status(200).send(category);
})

router.post('/', async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if (!category){
        return res.status(404).send('Categoria não pode ser criada')
    }
    res.send(category);
})

// api/v1/IDPARADELETAR
router.delete('/:id', (req, res) =>{
    Category.findByIdAndDelete(req.params.id).then(category =>{
        if (category){
            return res.status(200).json({success: true, message: 'Categoria Deletada'})
        }else{
            return res.status(404).json({success: false, message: 'Categoria não encontrada'})
        }
    }).catch(err =>{
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;