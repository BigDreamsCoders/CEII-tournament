const Participante = require('../models/participante');

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
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/participante/'+doc._id
                    },
                    control: doc.control,
                    pagoCancelado: doc.pagoCancelado
                }
            }),
        });
    })
    .catch(err => {
        estandar.errorChecker(res,err);
    });
};

exports.participantes_delete = (req,res,next)=>{
    const id = req.params.idParticipante;
    Usuario.remove({_id: id}).exec().then(result => {
        estandar.exitoQuery(res,"Participante borrado");
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
}

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
    /*Usuario.remove({_id: id}).exec().then(result => {
        estandar.exitoQuery(res,"Participante borrado");
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   */
}