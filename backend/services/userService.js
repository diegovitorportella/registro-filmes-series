import userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwtHelper.js';


class UserService{
    condstructor(UserRepository){
        this.userRepository = UserRepository;
    }
    async registerUser(user){
        const existingUser = await this.userRepository.findUserByEmail(user.email);
        if(existingUser){
            throw new Error('Usuario ja existe com esse email');
        }
        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }
    async loginUser(email, password){
        const user = await this.userRepository.gewtUserByemailWithPassword(email);
        if(!user || !user.isValidPassword(password)){
            throw new Error('Email ou senha invalidos')
        }
        const { password: hasPassword, ...userWithoutPassword } = user.get({plain: true})
        const token = generateToken({id: user.id, email: user.email})

        return {
            user: userWithoutPassword,
            token: token,
        };
    }
    async getUserById(id){
        const user = await this.userRepository.findUserById(id);
        if(!user){
            throw new Error('Usuario nao encontrado');
        }
        return user;
    }
}