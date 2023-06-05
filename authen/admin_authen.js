const db=require('../models/user')
const jwt=require("jsonwebtoken")
secretkey="secretkey"


exports.authenticateToken = (req, res, next) => {

    const token = req.headers['authorization'];
    console.log(token)
    console.log(!token)

    if (!token) {
        return res.send({ status: 404, message: " Token Not Present , please enter token!!" });
    }

    jwt.verify(token, secretkey, async (err, user) => {
        if (err) {
            return res.status(403).send({ status: 403, message: "Token Invalid" });
        }



        else {
            try {
                let jwt_role = await db.query().findOne({
            
                    Email:user.Email,
                   
                
               
            })

                if (jwt_role.Role == "admin") {
                    next();
                }
                else {
                    res.status(404).send({status:404,message:"Not an admin"});
                }

            }
            catch(error){
                res.status(404).send(JSON.stringify('API Response error'+error))

            }


            // req.user = user;
            
        }



    })
}
