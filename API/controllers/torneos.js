const Toreno = require('../models/torneo');
const Participante = require('../models/participante');

const estandar = require('../tools/estandar');

exports.torneos_get_all = (req,res,next)=>{
    Toreno.find({}, null,{sort: {nombre: 1}}, (err, data)=>{
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
                        url: 'http://localhost:3000/API/toreno/'+doc._id
                    }
                }
            }),
        });
    })
    .catch(err => {
        estandar.errorChecker(res,err);
    });
};