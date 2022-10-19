const db = require("../models");
const Meet = db.meet;
checkDuplicateDate = (req, res, next) => {
    Meet.findOne({
        where: {
            tanggal: req.body.tanggal
        }
    }).then(meet => {
        if(meet){
            res.status(400).send({
                message: "Failed! Date meeting is already in submission"
            });
            return;
        }
        next();
    });
};

checkUserData = (req, res, next) => {
    Meet.findOne({
        where: {
            user_id: req.body.user_id
        }
    }).then(meet => {
        if(meet){
            res.status(400).send({
                message: "Failed! Data meeting is not found"
            });
            return;
        }
        next();
    });
};

const verifyMeet = {
    checkDuplicateDate: checkDuplicateDate,
    checkUserData: checkUserData
};
module.exports = verifyMeet;

// () => {
//     res.status(400).send({
//         message: "Failed! Date meeting is already in submission"
//     });
//     return;
    
// }).catch(()=>{
//     next();
// });