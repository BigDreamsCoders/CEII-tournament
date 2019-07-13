const Usuario = require('../models/user');

const estandar = require('../tools/standard-responses');
const autenticacion = require('../tools/authentication-responses');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.usuarios_get_all = (req,res,next)=>{
    const id = req.userData.idUsuario;
    Usuario.find({}).sort({correo: 1})
    .select('_id correo nombre apellido identificador')
    .exec()
    .then(usuario =>{
        res.status(200).json({
            count: usuario.length,
            usuarios: usuario.map(doc =>{
                return {
                    _id: doc._id,
                    correo: doc.correo,
                    nombre: doc.nombre,
                    apellido: doc.apellido,
                    identificador: doc.identificador,
                    peticion:{
                        tipo: 'GET',
                        url: 'http://localhost:3000/API/usuario/'+doc._id
                    }
                }
            })
        });
    }).catch(err => {
        estandar.errorChecker(res,err);
    });
};
exports.usuarios_get_personal = (req,res,next)=>{
    const id = req.userData.idUsuario;
    Usuario.find({_id:id})
    .select('_id correo nombre apellido identificador')
    .exec()
    .then(usuario =>{
        console.log(usuario);
        res.status(200).json(usuario);
    }).catch(err => {
        estandar.errorChecker(res,err);
    });
};

exports.usuarios_registrar = (req,res,next)=>{
    const iden = req.body.identificador;
    console.log(iden)
    Usuario.find({$or: [
        {correo: req.body.correo}, 
        {identificador: {$in: iden} }
    ]})
    .exec()
    .then(usuario =>{
        if(usuario.length>= 1){
            estandar.creacionFallida(res);
        }
        else{
            bcrypt.hash(req.body.secreto, 10, (err,hash)=>{
                if(err){
                   estandar.errorChecker(res, err);
                }
                else{
                    const usuarioCreado = new Usuario({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    correo: req.body.correo,
                    secreto: hash,
                    identificador: iden,
                    rol: "comun"
                    });
                    usuarioCreado.save()
                    .then(respuesta =>{
                        console.log(respuesta);
                        res.status(201).json({
                            mensaje: 'Usuario creado',
                            usuario: {
                                _id: respuesta._id,
                                nombre: respuesta.nombre,
                                apellido: respuesta.apellido,
                                correo: respuesta.correo,
                                identificador: respuesta.identificador,
                                rol: respuesta.rol
                            }
                        })
                    })
                }
            });
        }
    })
    .catch(err =>{
        estandar.errorChecker(res,err);
    });
};

exports.usuarios_ingresar = (req,res,next)=>{
    Usuario.findOne({correo: req.body.correo}).exec().then(doc =>{
    if(!doc){
        autenticacion.falloAutenticacion(res);
    }
    else{
        bcrypt.compare(req.body.secreto, doc.secreto, (err, result)=>{
            if(err){
                estandar.errorChecker(res,err);
            }else{
                if(result){
                    const token = jwt.sign({
                        idUsuario: doc._id,
                        correo: doc.correo,
                        rol: doc.rol
                    },"secret_13asAZ32S",{
                        expiresIn: "1h"
                    });
                    autenticacion.exitoAutenticacion(res,token);
                }
                else{ autenticacion.falloAutenticacion(res);}
            }
        });
    }
})
.catch(err =>{
    estandar.errorChecker(res,err);
})
};

exports.usuarios_delete = (req,res,next)=>{
    const id = req.params.idUsuario;
    Usuario.remove({_id: id}).exec().then(result => {
        estandar.exitoQuery(res,"Usuario borrado");
    }).catch(err => {
        estandar.errorChecker(res,err);
    });   
};

exports.usuarios_patch = (req,res,next)=>{
    const id = req.params.idTorneo;
    const opsActualizar = {};
    for(const opcion of req.body){
        opsActualizar[opcion.campoActualizar] = opcion.valor;
    }
    Usuario.updateOne({_id: id}, { $set : opsActualizar })
    .exec()
    .then(resultado => {
        estandar.exitoQuery(res, "Usuario actualizado")
    })
    .catch(err => {
        errorChecker(res,err);
    });
};

exports.usuarios_put = (req,res,next)=>{

};