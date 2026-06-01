export const admin =async(req,response,next)=>{
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        response.status(403).json({
            message:"Access denied, admin only "
        })
    }
}