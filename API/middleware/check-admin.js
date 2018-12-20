//Checks if the user has the rights for an action
module.exports = (req,res,next) =>{
    if(req.userData.role === "admin"){
        next();
    }
    else{
        return res.status(401).json({
            message: 'Not authorize for this'
        });
    }
};