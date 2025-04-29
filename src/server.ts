import express, { NextFunction, response } from 'express'
import dotenv from 'dotenv'
import { Request,Response } from 'express';
import { generateAccessToken, generateRefreshToken } from './utils/generateToken';
import jwt from 'jsonwebtoken'
import { authenticateToken } from './middleware/authToken';

dotenv.config();

const app = express();
const PORT = 3500;

app.use(express.json());

type User = {
    username: string;
    password: string;
}

const users: User[] = [{
    username: 'ushani',
    password:'ushani123'
}]

app.post('/login', (req:Request , res: Response)=>{

    const {username,password} = req.body;

    const user = users.find(u=>u.username == username && u.password == password)
    if(!user)  res.sendStatus(401);

    const accessToken = generateAccessToken({username});

    const refreshToken = generateRefreshToken({username});

    res.json({accessToken,refreshToken})


})


app.get('/protected', authenticateToken , (req: Request , res: Response) => {
    return res.json({message: 'this is protected'})
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

