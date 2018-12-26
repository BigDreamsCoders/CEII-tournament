exports.render_index =  (req, res, next) => {
    res.status(200).render('index', { 
        title: 'Hey', 
        mensaje: 'Index here!', 
        texto:'Texto de intro', 
        parrafo:'Texto de index'});
};

exports.render_torneos =  (req, res, next) => {
    res.status(200).render('torneos', { 
    title: 'Torneo', 
    mensaje: 'Torneos here!', 
    texto:'Torneos aqui',
    parrafo:'Parrafo de torneos'});
};