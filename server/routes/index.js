const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let allProducts = await db.fetchAllProducts();
        res.json(allProducts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let product = await db.findProductById(req.params.id);
        if (product === undefined) { res.sendStatus(404); }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/search/:name', async (req, res, next) => {
    try {
        let product = await db.findProductByName(req.params.name);
        if (product === undefined) { res.sendStatus(404); }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try {
        await db.newProduct(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:product_id', async (req, res, next) => {
    try {
        let product = await db.updateProduct(req.params.product_id, req.body);
        if (product === undefined) { res.sendStatus(404); }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.removeProduct(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;