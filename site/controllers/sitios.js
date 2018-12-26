exports.render_index =  (req, res, next) => {
    res.render('index', { title: 'Hey', mensaje: 'Index there!', texto:'Json h2', parrafo:'Texto de parrafo'});
};

exports.render_torneos =  (req, res, next) => {
    res.render('torneos', { title: 'Hey', mensaje: 'Torneos here!', texto:'Json h2', parrafo:'Texto de parrafo'});
};