'use strict'

const authService = require('../services/auth-services');
const repository = require('../repositories/cliente');
const md5 = require('md5');
var config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridKey);

exports.post = async (req, res, next) => {

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        

        const msg = {
            to: req.body.email,
            from: 'l_x-kira@hotmail.com',
            subject: 'Bem vindo ao GOku',
            html:  global.EMAIL_TMPL.replace('{0}', req.body.name),
          };
          sgMail.send(msg);

        

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'

        });

    } catch (e) {
        res.status(400).send({
            message: 'falha ao cadastrar cliente ' + e
        });
    }



};

exports.authenticate = async(req, res, next) => {
    try {
        const cliente = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!cliente) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: cliente._id,
            email:cliente.email,
            name: cliente.name,
        });

        res.status(201).send({
            token: token,
            data: {
                email: cliente.email,
                name: cliente.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};