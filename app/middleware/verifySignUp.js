const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
// const FIELDS = db.FIELDS;
checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();            
        });
    });
};
checkDuplicateUsernameOrEmailOrField = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            User.findOne({
                where: {
                    position: req.body.position
                }
            }).then(user => {
                if (user) {
                    res.status(400).send({
                        message: "Failed! Fields is already in use"
                    });
                    return;
                }
                next();
            });
        });
    });
};
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};
// checkFieldsExisted = (req, res, next) => {
//     if (req.body.fields){
//         for (let i = 0; i < req.body.fields.length; i++){
//             if(!FIELDS.includes(req.body.fields[i])) {
//                 res.status(400).send({
//                     message: "Failed! Field does not exist = " + req.body.fields[i]
//                 });
//                 return;
//             }
//         }
//     }
//     next();
// };
const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkDuplicateUsernameOrEmailOrField: checkDuplicateUsernameOrEmailOrField,
    checkRolesExisted: checkRolesExisted,
};
module.exports = verifySignUp;