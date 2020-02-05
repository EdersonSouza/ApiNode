'use strict'

const repository = require('../repositories/product');
exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({
            message: 'falha ao preocessar requisição'

        });
    }



}

exports.getByslug = async (req, res, next) => {
    try {
        var data = await repository
            .getByslug(req.params.slug);
        res.status(200).send(data);


    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar sua requisição ' + e
        })
    };

}

exports.getById = async (req, res, next) => {
    try {

        var data = await repository
            .getById(req.params.id);
        res.status(200).send(data);


    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar sua requisição ' + e
        });
    }



}
exports.post = async (req, res, next) => {

    try {
        await repository.create(req.body);

        res.status(201).send({
            message: 'Produto cadastrado com sucesso'

        });

    } catch (e) {
        res.status(400).send({
            message: 'falha ao cadastrar produto ' + e
        });
    }



};

exports.put = async (req, res, next) => {
    try {

        await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: 'Produto atualizado com sucesso'

        });
    }catch (e) {
        res.status(400).send({
            message: 'falha ao atualizar produto ' + e
        });
    }
    
        
};

exports.delete = async(req, res, next) => {
    try{
        await repository.del(req.params.id);
        res.status(200).send({
            message: 'Produto removido com sucesso'

        });

    }catch (e) {
        res.status(400).send({
            message: 'falha ao remover produto ' + e
        });
    }
   
   
};