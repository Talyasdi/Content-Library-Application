const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "You must be logged in" });
  }
  const token = authorization.split(" ")[1];
  try{
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({_id}).select('_id')
    next();

  } catch(err){
    console.log(err)
    res.status(401).json({msg: "Request not authorized"})
  }
    
};
module.exports = requireAuth;
