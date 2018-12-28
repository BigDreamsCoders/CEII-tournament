const Torneo = require('../../API/models/torneo');
const Participante = require('../../API/models/participante');

const estandar = require('../../API/tools/estandar');


exports.render_index =  (req, res, next) => {
    res.status(200).render('index', { 
        title: 'Hey', 
        mensaje: 'Index here!', 
        texto:'Texto de intro', 
        parrafo:'Texto de index'});
};

exports.render_torneos =  (req, res, next) => {
    Torneo.find({}, null,{sort: {nombre: 1}}, (err, data)=>{
        if(err){
            estandar.errorChecker(res,err);
        }
    })
    .select('_id nombre facultad creadoEl fechaEvento lugarEvento precioEntrada cupoEvento imagenTorneo')
    .exec()
    .then(docs => {
        res.status(200).render('torneos', { 
            title: 'Torneos', 
            mensaje: 'Los torneos se desplegaran', 
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
                        url: 'http://localhost:3000/torneos/'+doc._id
                    }
                }
            })});
    })
    .catch(err => {
        estandar.errorChecker(res,err);
    });
};
exports.torneos_get_all = (req,res,next)=>{
    
};

