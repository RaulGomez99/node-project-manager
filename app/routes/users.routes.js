const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const Model = require("../model/pm_manager.model")

const optsCookie = {
	expires: new Date(Date.now() + 360000),
	secure: false, // set to true if your using https
	httpOnly: true
}

router.post("/users/logIn", (req, res, next) => {
	// TODO verify user data

    passport.authenticate("local-login", { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.send({ message: 'Problemas internos ' })
        }
        req.logIn(user, error => {
            const token = Model.createWebToken({
                id: user.id,
                nickname: user.nickname
            })
			res.cookie("jwt", token, optsCookie)
            res.send({ succes: true, message: 'User has been logged' })
        })
    })(req, res, next)
})

router.get('/users/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/users/profile', (req, res) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(401).send({ auth: false });
		}
		res.status(200).send({
			auth: true,
			user
		})
	})(req, res)
});

module.exports = router
