const Torneo = require('../models/torneo');
const Participante = require('../models/participante');

const estandar = require('../tools/estandar');


exports.torneos_get_all = (req,res,next)=>{
    Torneo.find({}, null,{sort: {nombre: 1}}, (err, data)=>{
        if(err){
            estandar.errorChecker(res,err);
        }
    })
    .select('_id nombre facultad creadoEl fechaEvento lugarEvento precioEntrada cupoEvento imagenTorneo')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            torneos: docs.map(doc =>{
                return {
                    _id: doc._id,
                    creadoEl: doc.creadoEl,
                    nombre: doc.nombre,
                    facultad: doc.facultad,
                    fechaEvento: doc.fechaEvento,
                    precioEntrada: doc.precioEntrada,
                    cupoEvento: doc.cupoEvento,
                    lugarEvento: doc.lugar,
                    imagenTorneo: doc.imagenTorneo,
                    peticion:{
                        tipo: 'GET',
                        url: 'http://localhost:3000/API/torneos/'+doc._id
                    }
                }
            }),
        });
    })
    .catch(err => {
        estandar.errorChecker(res,err);
    });
};

exports.torneos_get_one = (req,res,next)=>{
    const id = req.params.idTorneo;
    Torneo.findById(id)
    .select('_id nombre facultad creadoEl fechaEvento lugarEvento precioEntrada cupoEvento imagenTorneo participantes')
    .populate('participantes', '_id registradoEl nick llevaControl pagoCancelado informacion')
    .populate('informacion', 'correo')
    .populate('organizadoPor', 'correo')
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                _id: doc._id,
                creadoEl: doc.creadoEl,
                nombre: doc.nombre,
                facultad: doc.facultad,
                fechaEvento: doc.fechaEvento,
                precioEntrada: doc.precioEntrada,
                cupoEvento: doc.cupoEvento,
                lugarEvento: doc.lugar,
                imagenTorneo: doc.imagenTorneo,
                organizadoPor: doc.creadoPost,
                participantes: doc.map(docparticipante =>{
                    return {
                        registradoEl: docparticipante.registradoEl,
                        nick: docparticipante.nick,
                        llevaControl: docparticipante.llevaControl,
                        pagoCancelado: docparticipante.pagoCancelado,
                        correo: docparticipante.informacion.correo,
                        peticion:{
                            tipo: 'GET',
                            url: 'http://localhost:3000/API/participantes/'+docparticipante._id
                        }
                    }
                })
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

exports.torneos_post_crear = (req,res,next)=>{
    const id = req.userData.idUsuario;
    const torneo = new Torneo({
        nombre: req.body.nombre,
        facultad: req.body.facultad,
        fechaEvento: req.body.fechaEvento,
        lugarEvento: req.body.lugarEvento,
        precioEntrada: req.body.precioEntrada,
        cupoEvento: req.body.cupoEvento,
        participantes: [],
        imagenTorneo: "uploads\\"+req.file.filename,
        creadoPost: id
    });
    torneo.save().then(resultado=>{
        res.status(201).json({
            creadoEl: resultado.creadoEl,
            nombre: resultado.nombre,
            facultad: resultado.facultad,
            fechaEvento: resultado.fechaEvento,
            precioEntrada: resultado.precioEntrada,
            cupoEvento: resultado.cupoEvento,
            lugarEvento: resultado.lugarEvento,
            imagenTorneo: resultado.imagenTorneo,
            peticion:{
                tipo: 'GET',
                url: 'http://localhost:3000/API/torneos/'+resultado._id
            },
            estado: 201
        });
    });
};

exports.torneos_delete = (req,res,next)=>{
    const id = req.params.idTorneo;
    Torneo.remove({_id: id}).exec().then(result => {
        estandar.exitoQuery(res,"Torneo borrado");
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
};

exports.torneos_post_inscribir = (req,res,next) =>{
    const id = req.userData.idUsuario;
    Participante.findOne({informacion: id})
    .exec()
    .then(resultado =>{
        if(resultado){
            Torneo.update({_id: req.params.idTorneo}, {$addToSet: {participantes: id}})
            .exec().then(torneoactualizado =>{
                if(torneoactualizado.nModified===0){
                    estandar.errorChecker(res,{message:"Usuario ya inscrito"});
                }
                else{
                    estandar.exitoQuery(res,"Usuario registrado para el torneo");
                }
            });
        }
        else{
            estandar.errorChecker(res,{message:"No tiene perfil de participante"});
        }
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
};