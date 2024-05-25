const jwt = require('jsonwebtoken');
const accessTokenExpTime="30m";
const refreshTokenExpTime="1d";
const getRefereshToken=async(id)=>{
    const refereshToken = jwt.sign(
        {_id:id},
        process.env.JWT_REFRESH_TOKEN_KEY,
        {expiresIn:refreshTokenExpTime}
    )   
    return refereshToken;
}

const getAccessToken=async(id)=>{
    const accessToken = jwt.sign(
        {_id:id},
        process.env.JWT_ACCESS_TOKEN_KEY,
        {expiresIn:accessTokenExpTime}
    )
    return accessToken
 }

 module.exports={getRefereshToken,getAccessToken};