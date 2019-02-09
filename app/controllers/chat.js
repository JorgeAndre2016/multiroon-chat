module.exports.iniciaChat = function(application, req, res){
    
    var dadosForm = req.body;
    
    req.assert('apelido', 'Apelido deve ser preenchido').notEmpty();
    req.assert('apelido', 'Apelido deve conter entre 3 e 15 caracteres').len(3, 15);
    
    var errors = req.validationErrors();
    
    if(errors){
        res.render('index', {validacao: errors, dadosForm});
        return;
    }{
        res.render('chat');
    }
}