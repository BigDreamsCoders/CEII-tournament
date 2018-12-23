const Participante = require('../models/participante');
const Usuario = require('../models/usuario');

const estandar = require('../tools/estandar');

exports.participantes_get_all = (req,res,next)=>{
    Participante.find({}, null,{sort: {nick: 1}}, (err, data)=>{
        if(err){
            estandar.errorChecker(res,err);
        }
    })
    .select('_id nick registradoEl informacion control pagoCancelado')
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
                    control: doc.control,
                    pagoCancelado: doc.pagoCancelado,
                    peticion:{
                        tipo: 'GET',
                        url: 'http://localhost:3000/API/participante/'+doc._id
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
    const id = req.params.participanteId;
    Product.findById(id)
    .select('_id nick registradoEl control pagoCancelado informacion')
    .populate('informacion', 'correo identificador')
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                _id: doc._id,
                nick: doc.nick,
                registradoEl: doc.registradoEl,
                control: doc.control,
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
                        },
                        estado: 201
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
                    },
                    estado: 201
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
    Usuario.remove({_id: id}).exec().then(result => {
        estandar.exitoQuery(res,"Participante borrado");
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
}