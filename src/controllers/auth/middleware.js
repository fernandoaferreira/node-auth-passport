module.exports = (req, res, next) => {

    if(req.isAuthenticate()) return next();

    return res.redirect('/auth');

}