import userModel from '../models/userModel.js'

class UserRepository {
    async createUser(name, email, password) {
        try {
            const newUser = await User.create({ name, email, password });
            return newUser;
        } catch (error) {
            throw new Error('Erro ao criar usuario: ' + error.message);
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        }
        catch (error) {
            throw new Error('Erro ao buscar usuario por email: ' + error.message);
        }
    }
    async findUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuario por ID: ' + error.message);
        }
    }
    async updateUser(id, updates) {
        try {
            const user = await this.findUserById(id);
            if (!user) throw new Error('Usuario nao encontrado')
            await user.update(updates);
            return user;
        } catch (error) {
            throw new Error('Erro ao atualizar usuario: ' + error.message);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.findUserById(id);
            if (!user) throw new Error('Usuario nao encontrado')
            await user.destroy();
            return true;
        } catch (error) {
            throw new Error('Erro ao deletar usuario: ' + error.message);
        }
    }
    getAllUsers() {
        return userModel.findAll({attributs: {exclude: ['password']}});
    }
}

export default new UserRepository();