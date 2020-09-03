const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();
/*********************************************************************************** */
/*                                      PRODUTOS                                     */
/*********************************************************************************** */
router.get('/products/', async (req, res, next) => {
    try {
        let allProducts = await db.fetchAllProducts();
        res.json(allProducts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/products/:id', async (req, res, next) => {
    try {
        let product = await db.findProductById(req.params.id);
        if (product === undefined) { res.sendStatus(404); }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/products/search/:name', async (req, res, next) => {
    try {
        let product = await db.findProductByName(req.params.name);
        if (product === undefined) { res.sendStatus(404); }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/products/', verifyToken, (req, res, next) => {
    try {
        jwt.verify(req.token, 'secretkey', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                await db.newProduct(req.body);
                res.sendStatus(200);
            }
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/products/:product_id', async (req, res, next) => {
    try {
        let product = await db.updateProduct(req.params.product_id, req.body);
        if (product === undefined) { res.sendStatus(404); }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/products/:id', async (req, res, next) => {
    try {
        await db.removeProduct(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

/*********************************************************************************** */
/*                                      LOGIN                                        */
/*********************************************************************************** */

router.post('/login', async (req, res, next) => {
    console.log(req.body);

    jwt.sign(req.body, 'secretkey', (err, token) => {
        console.log("deu certo");
        res.json({
            token: token
        })
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
module.exports = router;