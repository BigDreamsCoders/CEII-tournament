const Participante = require('../models/participant');
const Usuario = require('../models/user');

const estandar = require('../tools/standard-responses');

exports.participantes_get_all = (req,res,next)=>{
    Participante.find({}).sort({nick: 1})
    .select('_id nick registradoEl informacion llevaControl pagoCancelado')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            participantes: docs.map(doc =>{
                return {
                    _id: doc._id,
                    nick: doc.nick,
                    registradoEl: doc.registradoEl,
                    informacion: doc.informacion,
                    llevaControl: doc.llevaControl,
                    pagoCancelado: doc.pagoCancelado,
                    peticion:{
                        tipo: 'GET',
                        url: 'http://localhost:3000/API/participantes/'+doc._id
                    }   
                }
            }),
        });
    })
    .catch(err => {
        estandar.errorChecker(res,err);
    });
};

exports.participantes_get_one = (req,res,next)=>{
    const id = req.params.idParticipante;
    Product.findById(id)
    .select('_id nick registradoEl llevaControl pagoCancelado informacion')
    .populate('informacion', 'correo identificador')
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                _id: doc._id,
                nick: doc.nick,
                registradoEl: doc.registradoEl,
                llevaControl: doc.llevaControl,
                pagoCancelado: doc.pagoCancelado,
                correo: doc.informacion.correo,
                identificador: doc.informacion.identificador
            });
        }
        else{
            estandar.nullChecker(res);
        }
    })
    .catch(err => {
        estandar.errorChecker(res,err);
    });
};

exports.participantes_post_crear = (req,res,next)=>{
    const identifica = req.body.carnet;
    const carnet = [{
        documento: "carnet",
        valor: identifica
    }]
    Usuario.findOne({$or: [
        {correo: req.body.correo}, 
        {identificador: {$in: carnet} }
    ]})
    .exec()
    .then(resultado => {
        Participante.findOne({nick: req.body.nick})
        .exec()
        .then(participante => {
        if(resultado){
            if(participante){
                estandar.exitoQuery(res,"Participante ya registrado");
            }
            else{
                //Si ya existe un usuario con ese correo o documento, pero no el nickname
                const participanteCreado = new Participante({
                    nick: req.body.nick,
                    llevaControl: req.body.llevaControl,
                    informacion: resultado._id
                });
                participanteCreado.save().then(nuevoparticipante => {
                    res.status(201).json({
                        mensaje: 'Participante creado',
                        participante:{
                            _id: nuevoparticipante._id,
                            nick: nuevoparticipante.nick,
                            llevaControl: nuevoparticipante.llevaControl,
                            informacion: nuevoparticipante.informacion
                        }
                    })
                });
            }
        }
        else{
            //Ninguno de los dos
            const usuarioCreado = new Usuario({
                correo: req.body.correo,
                identificador: identifica,
                rol: "comun",
            });
            usuarioCreado.save()
            .then(nuevousuario=>{
                    const participanteCreado = new Participante({
                        nick: req.body.nick,
                        llevaControl: req.body.llevaControl,
                        informacion: nuevousuario._id
                    });
                    return participanteCreado.save();
                }
            )
            .then(nuevoparticipante => {
                res.status(201).json({
                    mensaje: 'Participante creado',
                    participante:{
                        _id: nuevoparticipante._id,
                        nick: nuevoparticipante.nick,
                        llevaControl: nuevoparticipante.llevaControl,
                        informacion: nuevoparticipante.informacion
                    }
                })
            });
        }
    })
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
}

exports.participantes_delete = (req,res,next)=>{
    const id = req.params.idParticipante;
    Participante.remove({_id: id}).exec().then(result => {
        estandar.exitoQuery(res,"Participante borrado");
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
}

//Modificar participante
exports.participantes_patch = (req,res,next) =>{
    const id = req.params.idTorneo;
    const opsActualizar = {};
    for(const opcion of req.body){
        opsActualizar[opcion.campoActualizar] = opcion.valor;
    }
    Participante.updateOne({_id: id}, { $set : opsActualizar })
    .exec()
    .then(resultado => {
        estandar.exitoQuery(res, "Participante actualizado")
    })
    .catch(err => {
        errorChecker(res,err);
    });
};
//Agregar un campo a participante
exports.participantes_put = (req,res,next) =>{
    
};

//Automatizacion 
/*
exports.participantes_post_agregar_participante = (req,res,next)=>{
    const id = req.params.productId;
    const user_id = req.userData.userId;
};
*/ 