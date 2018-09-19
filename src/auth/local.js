const localStrategy = require('passport-local');
const User = require('../model/user');

module.exports = (passport) => {

    passport.serializeUser((user, cb) => {
        return cb(null, user._id)
    })

    passport.deserializeUser((id, cb) => {

        User.findById(id)
            .then(user => cb(null, user))
            .catch(erro => cd(erro, {}))

    })

    passport.use('local-signup', new localStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

    },
        function (req, username, password, cb) {

            User.findOne({ username: username })
                .then((userExiste) => {
                    if (!userExiste) {
                        let user = new User(req.body)

                        user.password = user.genHash(user.password)

                        return user.save()
                            .then((user) => {
                                return cb(null, user)
                            })
                            .catch((erro) => {
                                console.log(erro)
                                return
                            })
                    }

                    return cb(null, false)
                })
                .catch((erro) => {
                    return cb(erro, false)
                })
        }
    ));

    passport.use('local-signin', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, cb) {

        User.findOne({ username })
            .then((user) => {
                if(!user){
                    return cb(null, false)
                }

            user.validate(password,  (erro, result) => {
                if(!result || erro) {
                    return cb(null, false)
                }

                return cb(null, user)
            })
            })
    }
    ));

}