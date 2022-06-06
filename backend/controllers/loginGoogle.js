const connection = require("../models/db");


const loginGoogle = (req,res) => {
 const email=req.body.email;
 const query="SELECT * FROM users WHERE email = ? ;"; 
 const data=[email.toLowerCase()];
 connection.query( query, data, (err,result) => {
      if (result.length){
try{
    const payload = {
        userId: result[0].id,
        role: result[0].role_id,
      };
      const options = { expiresIn: "180m" };
      const secret = process.env.SECRET;
      const token = await jwt.sign(payload, secret, options);

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        token: token,
        userId: result[0].id,
        role_id: result[0].role_id,
      });
}catch(err){
    res.status(500).json({
        success: false,
        message: `Server Error`,
      });
}
      }
 })
}

module.exports= loginGoogle