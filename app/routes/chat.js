module.exports = function(application){
    application.post('/chat', function(req, res){
        res.render('chat');
    });
}