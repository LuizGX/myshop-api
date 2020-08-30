const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '12345678',
    user: 'root',
    database: 'myshop',
    host: 'localhost',
    port: '3309'
});

let myshopdb = {};

myshopdb.fetchAllProducts = () => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM products`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    });

};

myshopdb.findProductById = (id) => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM products WHERE product_id = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        })
    });

};

myshopdb.newProduct = (product) => {

    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO products(product_name, product_quantity, product_details, product_price) VALUES (?,?,?,?)`, [product.product_name, product.product_quantity, product.product_details, product.product_price], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    });

};

myshopdb.updateProduct = (id, product) => {

    return new Promise((resolve, reject) => {
        pool.query(`UPDATE products SET product_name = ?, product_quantity = ?, product_details = ?, product_price = ? WHERE product_id = ?`, [product.product_name, product.product_quantity, product.product_details, product.product_price, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    });

};

myshopdb.removeProduct = (id) => {

    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM products WHERE product_id = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
}

module.exports = myshopdb;