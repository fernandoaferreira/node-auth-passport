const User = require('../../model/user');

module.exports = (req, res) => {

    let id = req.params.id;

    User
        .deleteOne({ _id: id})
        .then(() => res.redirect('/users'))
        .catch((erro) => console.log(erro))

}