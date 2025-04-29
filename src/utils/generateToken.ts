import jwt from  'jsonwebtoken'

interface JWTUser{
    username: string;
}


export const generateAccessToken = (user:JWTUser) => {
    return jwt.sign(user, process.env.ACCESS_SECRET,{expiresIn: '1d'})
}

export const generateRefreshToken = (user: JWTUser) =>{
    return jwt.sign(user, process.env.REFRESH_SECRET, {expiresIn: '7d'})
}