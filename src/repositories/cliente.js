'use strict'
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async () =>{
    const res = await Cliente
        .find({
            active: true
        }, 'title price slug');
    return res;
}

exports.create = async(data) => {
    var cliente = new Cliente(data);
    await cliente.save();
}

exports.authenticate = async(data) => {
    const res = await Cliente.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}