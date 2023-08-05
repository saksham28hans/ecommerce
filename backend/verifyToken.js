const jwt = require('jsonwebtoken');


function verify(req,res,next)
{
  const authHeader = req.headers.token;
  if(authHeader)
  {
    const token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err)
        return res.status(403).json("Token is not valid")
        req.user = user;
        next();
    });
  }
  else
  {
    return res.status(401).json("You are not authorized");
  }
}

const verifyAndAuth = (req,res,next)=>{
  verify(req,res, ()=>{
    if(req.user.id === req.params.id || req.user.isAdmin)
    {
      next();
    }
    else{
      return res.status(403).json("You are not allowed to do that");
    }
  });
}

const verifyTokenAndAdmin = (req,res,next)=>{
  verify(req,res,()=>{
    if(req.user.isAdmin)
    {
      next();
    }
    else
    {
      return res.status(403).json("You are not allowed to do that");
    }
  });
}
module.exports = {verify,verifyAndAuth,verifyTokenAndAdmin};