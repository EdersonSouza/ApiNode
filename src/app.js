'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const config = require ('./config')



const app = express();

const router = express.Router();

mongoose.connect(config.uri,  {useNewUrlParser: true});


const product = require('./models/product');
const cliente = require('./models/cliente');
const order = require('./models/order');



//carrega as Rotas

const index = require('./routes/index');
const products = require('./routes/products');
const clientes = require('./routes/cliente');
const orders = require('./routes/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.use('/', index);
app.use('/products', products);
app.use('/cliente', clientes);
app.use('/orders', orders);



module.exports = app;