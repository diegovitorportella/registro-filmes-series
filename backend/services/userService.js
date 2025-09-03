import userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwtHelper.js';

class UserService{
    constructor(UserRepository){
        this.userRepository = UserRepository;
    }
    async createUserService(user){
        const existingUser = await this.userRepository.findUserByEmail(user.email);
        if(existingUser){
            throw new Error('Usuario ja existe com esse email');
        }
        return await this.userRepository.createUser(user);
    }
    async loginUser(email, password){
        const user = await this.userRepository.getUserByemailWithPassword(email);
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
    async getUserByEmail(email){
        const user = await this.userRepository.findUserByEmail(email);
        if(!user) throw new Error('Usuario nao encontrado');
        return user;
    }
    async getUserById(id){
        const user = await this.userRepository.findUserById(id);
        if(!user) throw new Error('Usuario nao encontrado');
        return user;
    }
    async updateUser(id, userData){
        const user = await this.userRepository.findUserById(id);
        if(!user)throw new Error('Usuario nao encontrado');
        return await this.userRepository.updateUser(id, userData);
    }
    async deleteUser(id){
        const user = await this.userRepository.findUserById(id);
        if(!user) throw new Error('Usuario nao encontrado');
        await this.userRepository.deleteUser(id);
        return {message: 'Usuario deletado com sucesso'};
    }
    getAllUsers(){
        return this.userRepository.getAllUsers();
    }

}

export default new UserService(userRepository);