import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;
const expiracaoToken = '2h';

export function generateToken(user){
    const carregamento = {
        id: user.id,
        email: user.email,
    }
    return jwt.sign(carregamento, secretKey, { expiresIn: expiracaoToken });
}

export function verifyToken(token){
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Token Invalido ou expirado');
    }
}