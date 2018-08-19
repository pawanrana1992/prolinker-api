const userModel = require('../modules/users.schema');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../../config/passport')(passport);
const bcrypt = require('bcrypt');

const getToken = require('../../api/modules/token.module');



module.exports = {
    create: function (req, res, next) {

        if (!req.body.name || !req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass email and password.'});
        } else {
            // save the user
            userModel.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, function (err, result) {
                if (err)
                    next(err);
                else
                    res.json({status: "success", message: "User added successfully!!!", data: null});

            });
        }


    },


    authenticate: async function (req, res, next) {
        userModel.findOne({email: req.body.email}, function (err, userInfo) {
            if (err) {
                next(err);
            } else {

                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    // if user is found and password is right create a token
                    const token = jwt.sign(userInfo.toJSON(), process.env.APP_SECRET);
                    res.json({status: "success", message: "user found!!!", data: {user: userInfo, token: token}});

                } else {

                    res.json({status: "error", message: "Invalid email/password!!!", data: null});

                }
            }
        });
    },

    accessWall: function (req, res, next) {
        const token = getToken.getToken(req.headers);
        res.json({token: token});

    }


};
