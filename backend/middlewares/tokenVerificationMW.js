import JWT from 'jsonwebtoken'

export const tkenDecryptionMW = async(req , res , next) =>{
    try{
        const {token} = req.headers
        if (!token){
            return res.json({success : false , message : 'Token Auth failed, Re login!!'})
        }
        else{
            const dec_token = JWT.verify(token , process.env.JWT_SECRET)
            req.body.userID = dec_token.id
            next()
        }
    }catch(e){
        res.json({success : false , message : 'Error occured in the token decryption!'})
        console.log(e)

    }


} 